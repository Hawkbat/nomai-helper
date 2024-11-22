import type { CuriosityColors, ShipLogEntry, WebviewMessage } from "../webview"
import { createElement, getImageUri, getViewState, sendViewMessage, updateViewState } from "./shared"

export function makeShipLogViewer() {
    let entries: ShipLogEntry[] = []
    let colors: Record<string, CuriosityColors | undefined> = {}
    let entryPhotoURIs: Record<string, string | undefined> = {}

    const entryDivMap = new Map<string, HTMLElement>()

    window.addEventListener("message", e => {
        const msg = e.data as WebviewMessage
        switch (msg.type) {
            case "shipLogs":
                entries = msg.entries
                colors = msg.colors
                entryPhotoURIs = msg.photos
                rebuildCanvas()
                break
            case "selectShipLog":
                const entryDiv = entryDivMap.get(msg.id)
                if (entryDiv) {
                    entryDiv.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" })
                }
                break
        }
    })

    sendViewMessage({ type: "refresh" })

    const canvasDiv = createElement("div", "ship-log-canvas", document.body)

    canvasDiv.addEventListener("scrollend", () => {
        updateViewState(state => {
            state.canvas.scrollLeft = canvasDiv.scrollLeft
            state.canvas.scrollTop = canvasDiv.scrollTop
            return state
        })
    })

    const canvasPivotDiv = createElement("div", "ship-log-pivot", canvasDiv)

    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0
    let scale = 1.0

    function rebuildCanvas() {
        canvasPivotDiv.innerHTML = ""
        entryDivMap.clear()

        for (const entry of entries) {
            const [x, y] = entry.position
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)
        }

        const gutter = 500

        canvasPivotDiv.style.width = `${maxX - minX + gutter * 2}px`
        canvasPivotDiv.style.height = `${maxY - minY + gutter * 2}px`
        canvasPivotDiv.style.transform = `scale(${scale})`

        const offsetX = -minX + gutter
        const offsetY = -minY + gutter

        for (const entry of entries) {
            for (const rumor of entry.facts.rumor) {
                const source = entries.find(e => e.id === rumor.sourceID)
                if (!source) {
                    continue
                }
                const pivotDiv = createElement("div", "rumor-pivot", canvasPivotDiv)
                const [sx, sy] = source.position
                pivotDiv.style.left = `${sx + offsetX}px`
                pivotDiv.style.top = `${-sy + offsetY}px`
                const [tx, ty] = entry.position
                const [dx, dy] = [tx - sx, ty - sy]
                const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                pivotDiv.style.height = `${dist}px`
                const angle = -Math.atan2(dy, dx) + Math.PI / 2
                pivotDiv.style.transform = `translateY(-${dist}px) rotate(${angle}rad)`
                const lineDiv = createElement("div", "rumor-line", pivotDiv)
                const arrowBackDiv = createElement("div", "rumor-arrow-back", pivotDiv)
                arrowBackDiv.style.backgroundImage = `url(${getImageUri("arrowBlack")})`
                const arrowDiv = createElement("div", "rumor-arrow", pivotDiv)
                arrowDiv.style.backgroundImage = `url(${getImageUri("arrowWhite")})`
                arrowDiv.style.maskImage = `url(${getImageUri("arrowWhite")})`

                // This is inaccurate (actual game calculates ship log card bounding box intersections to position the arrow in the middle) but who cares

                let offset = -15
                if (entry.isCuriosity) {
                    offset += 50
                } else if (entry.parent) {
                    offset += 10
                } else {
                    offset += 25
                }
                if (source.isCuriosity) {
                    offset -= 50
                } else if (source.parent) {
                    offset -= 10
                } else {
                    offset -= 25
                }
                arrowBackDiv.style.top = `calc(50% + ${offset}px)`
                arrowDiv.style.top = `calc(50% + ${offset}px)`
            }
        }

        for (const entry of entries) {
            const pivotDiv = createElement("div", "entry-pivot", canvasPivotDiv)
            const [x, y] = entry.position
            pivotDiv.style.left = `${x + offsetX}px`
            pivotDiv.style.top = `${-y + offsetY}px`

            const cardDiv = createElement("div", "entry-card", pivotDiv)
            if (entry.isCuriosity) {
                cardDiv.classList.add("curiosity")
            }
            if (entry.parent) {
                const parentIsCuriosity = entries.find(e => e.id === entry.parent)?.isCuriosity
                if (parentIsCuriosity) {
                    cardDiv.classList.add("curiosity-subentry")
                } else {
                    cardDiv.classList.add("subentry")
                }
            }

            const color = colors[entry.curiosity ?? "DEFAULT"]
            cardDiv.style.setProperty("--curiosity-color", rgba(color?.color))
            cardDiv.style.setProperty("--curiosity-highlight-color", rgba(color?.highlightColor))

            const nameDiv = createElement("div", "entry-name", cardDiv, entry.name)
            const photoDiv = createElement("div", "entry-photo", cardDiv)
            const photoUri = entryPhotoURIs[entry.id ?? ""]
            photoDiv.style.backgroundImage = `url(${photoUri})`

            const countDiv = createElement("div", "entry-count", cardDiv, `${entry.facts.explore.length + entry.facts.rumor.length}`)

            cardDiv.addEventListener("click", e => {
                e.preventDefault()
                e.stopPropagation()
                sendViewMessage({ type: "selectShipLog", id: entry.id })
            })

            cardDiv.addEventListener("dblclick", e => {
                e.preventDefault()
                e.stopPropagation()
                sendViewMessage({ type: "openShipLog", id: entry.id })
            })

            entryDivMap.set(entry.id, cardDiv)
        }

        const { scrollLeft, scrollTop } = getViewState().canvas
        canvasDiv.scrollLeft = scrollLeft
        canvasDiv.scrollTop = scrollTop
    }

    window.addEventListener("wheel", e => {
        if (e.ctrlKey) {
            if (e.deltaY !== 0) {
                if (e.deltaY > 0) {
                    scale = Math.max(0.1, scale - 0.1)
                } else {
                    scale = Math.min(4.0, scale + 0.1)
                }
                canvasPivotDiv.style.transform = `scale(${scale})`
            }
        }
    })

    let panning = false
    let panFracX = 0
    let panFracY = 0

    window.addEventListener("mousedown", e => {
        e.preventDefault()
        panning = true
        panFracX = 0
        panFracY = 0
    })

    window.addEventListener("mousemove", e => {
        if (panning) {
            e.preventDefault()
            if (e.buttons === 0) {
                panning = false
                return
            }
            panFracX += -e.movementX
            panFracY += -e.movementY
            if (panFracX >= 1) {
                const dx = Math.floor(panFracX)
                canvasDiv.scrollLeft += dx
                panFracX -= dx
            }
            if (panFracX <= -1) {
                const dx = Math.ceil(panFracX)
                canvasDiv.scrollLeft += dx
                panFracX -= dx
            }
            if (panFracY >= 1) {
                const dy = Math.floor(panFracY)
                canvasDiv.scrollTop += dy
                panFracY -= dy
            }
            if (panFracY <= -1) {
                const dy = Math.ceil(panFracY)
                canvasDiv.scrollTop += dy
                panFracY -= dy
            }
        }
    })

    window.addEventListener("mouseup", e => {
        if (panning) {
            e.preventDefault()
            panning = false
            updateViewState(state => {
                state.canvas.scrollLeft = canvasDiv.scrollLeft
                state.canvas.scrollTop = canvasDiv.scrollTop
                return state
            })
        }
    })

    function rgba(color?: { r?: number, g?: number, b?: number, a?: number }) {
        const r = (color?.r ?? 0).toString(16).padStart(2, "0")
        const g = (color?.g ?? 0).toString(16).padStart(2, "0")
        const b = (color?.b ?? 0).toString(16).padStart(2, "0")
        const a = (color?.a ?? 255).toString(16).padStart(2, "0")
        return `#${r}${g}${b}${a}`
    }
}
