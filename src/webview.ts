import * as vscode from "vscode"
import { onProjectChanged, project, projectActions } from "./project"
import { BASE_GAME_CURIOSITY_COLORS, BASE_GAME_ENTRIES } from "./data"
import { getFileNameWithoutExt } from "./utils"

export type WebviewMessage =
    | { type: "shipLogs", entries: ShipLogEntry[], colors: Record<string, CuriosityColors | undefined>, photos: Record<string, string | undefined> }
    | { type: "openShipLog", id: string }
    | { type: "refresh" }

export interface WebviewImageUris {
    arrowWhite: string
    arrowBlack: string
}

export interface ShipLogEntry {
    id: string
    name: string
    facts: {
        explore: {
            id: string
            text: string
        }[]
        rumor: {
            id: string
            text: string
            sourceID?: string
        }[]
    }
    astroObject: string
    position: [x: number, y: number]
    curiosity?: string
    isCuriosity?: boolean
    parent?: string
}

export interface CuriosityColor {
    r: number
    g: number
    b: number
    a: number
}

export interface CuriosityColors {
    color: CuriosityColor
    highlightColor: CuriosityColor
}

export function populateShipLogWebView(extensionUri: vscode.Uri, webview: vscode.Webview) {
    webview.options = {
        enableScripts: true,
        localResourceRoots: [
            extensionUri,
            ...(vscode.workspace.workspaceFolders?.map(f => f.uri) ?? []),
        ]
    }

    const imageUris: WebviewImageUris = {
        arrowWhite: `${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "images", "HUD_UI_WhiteArrow_d.png"))}`,
        arrowBlack: `${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "images", "HUD_UI_BlackArrow_d.png"))}`,
    }

    const nonce = getNonce()
    webview.html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Ship Log Viewer</title>
            <link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "fonts", "SpaceMono.css"))}">
            <link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "webview.css"))}">
		</head>
		<body>
            <script nonce="${nonce}">
                const IMAGE_URIS = ${JSON.stringify(imageUris)};
            </script>
			<script nonce="${nonce}" type="module" src="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "dist", "webview", "index.js"))}"></script>
		</body>
		</html>
	`

    const sendMessage = (msg: WebviewMessage) => webview.postMessage(msg)

    const sendShipLogs = () => {
        const colors: Record<string, CuriosityColors | undefined> = { ...BASE_GAME_CURIOSITY_COLORS }
        for (const system of project.systems) {
            for (const curiosity of system.data.curiosities ?? []) {
                if (curiosity.id) {
                    colors[curiosity.id] = {
                        color: { r: 0, g: 0, b: 0, a: 255, ...curiosity.color },
                        highlightColor: { r: 0, g: 0, b: 0, a: 255, ...curiosity.highlightColor },
                    }
                }
            }
        }

        const entries: ShipLogEntry[] = [...BASE_GAME_ENTRIES]

        for (const shipLog of project.shipLogs) {
            const planet = project.planets.find(p => p.data.ShipLog?.xmlFile && shipLog.uri.path.endsWith(p.data.ShipLog?.xmlFile))
            if (!planet) {
                continue
            }
            const system = project.systems.find(s => (s.data.name ?? getFileNameWithoutExt(s.uri) === (planet.data.starSystem ?? "SolarSystem")))
            if (!system) {
                continue
            }
            const mainEntries = shipLog.data.Entry ?? []
            const subEntries = mainEntries.flatMap(e => e.Entry ?? [])
            const allEntries = mainEntries.concat(subEntries)

            entries.push(...allEntries.map(e => {
                const translatedName = e.Name ? project.translations.find(t => t.uri.path.endsWith("english.json"))?.data.ShipLogDictionary?.[e.Name] : undefined
                const position = system.data.entryPositions?.find(p => e.ID === p.id)?.position
                const parent = subEntries.includes(e) ? mainEntries.find(m => m.Entry?.includes(e))?.ID : undefined

                const entry: ShipLogEntry = {
                    id: e.ID ?? "",
                    name: translatedName ?? e.Name ?? "",
                    curiosity: e.Curiosity,
                    isCuriosity: e.IsCuriosity,
                    astroObject: planet.data.name ?? getFileNameWithoutExt(planet.uri),
                    position: [position?.x ?? 0, position?.y ?? 0],
                    parent,
                    facts: {
                        explore: e.ExploreFact?.map(f => ({
                            id: f.ID ?? "",
                            text: f.Text ?? "",
                        })) ?? [],
                        rumor: e.RumorFact?.map(f => ({
                            id: f.ID ?? "",
                            text: f.Text ?? "",
                            sourceID: f.SourceID,
                        })) ?? [],
                    },
                }
                return entry
            }))
        }

        const photos: Record<string, string> = {}

        const photoUri = vscode.Uri.joinPath(extensionUri, "resources", "sprites", "DEFAULT_PHOTO.png")
        photos[""] = webview.asWebviewUri(photoUri).toString()

        for (const entry of BASE_GAME_ENTRIES) {
            const photoUri = vscode.Uri.joinPath(extensionUri, "resources", "sprites", `${entry.id}.png`)
            photos[entry.id] = webview.asWebviewUri(photoUri).toString()
        }
        for (const shipLog of project.shipLogs) {
            const planet = project.planets.find(p => p.data.ShipLog?.xmlFile && shipLog.uri.path.endsWith(p.data.ShipLog?.xmlFile))
            if (!planet) {
                continue
            }
            const entries = shipLog.data.Entry ?? []
            const subEntries = entries.flatMap(e => e.Entry ?? [])
            const allEntries = entries.concat(subEntries)
            for (const entry of allEntries) {
                const photoUri = vscode.Uri.joinPath(project.manifests?.[0].uri ?? planet.uri, "..", planet.data.ShipLog?.spriteFolder ?? ".", `${entry.ID}.png`)
                photos[entry.ID ?? ""] = webview.asWebviewUri(photoUri).toString()
            }
        }

        sendMessage({ type: "shipLogs", colors, entries, photos })
    }

    onProjectChanged.event(() => {
        sendShipLogs()
    })

    webview.onDidReceiveMessage((msg: WebviewMessage) => {
        switch (msg.type) {
            case "openShipLog":
                for (const shipLog of project.shipLogs) {
                    for (const entry of shipLog.data.Entry ?? []) {
                        if (entry.ID === msg.id) {
                            projectActions.openTreeItem({ type: "shiplog-entry", uri: shipLog.uri, id: entry.ID })
                            return
                        }
                        for (const subEntry of entry.Entry ?? []) {
                            if (subEntry.ID === msg.id) {
                                projectActions.openTreeItem({ type: "shiplog-entry", uri: shipLog.uri, id: subEntry.ID, parentID: entry.ID })
                                return
                            }
                        }
                    }
                }
                break
            case "refresh":
                sendShipLogs()
                break
        }
    })
}

function getNonce() {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
