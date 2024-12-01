import * as vscode from "vscode"
import { onProjectChanged, onSelectionChanged, project, projectActions, projectTranslate } from "./project"
import { BASE_GAME_CURIOSITY_COLORS, BASE_GAME_ENTRIES } from "./data"
import { getFileNameWithoutExt } from "./utils"
import { NomaiTreeItem } from "./treeview"

export type WebviewType = "shiplog-viewer" | "prop-editor"

export type WebviewMessage =
    | { type: "shipLogs", entries: ShipLogEntry[], colors: Record<string, CuriosityColors | undefined>, photos: Record<string, string | undefined> }
    | { type: "selectShipLog", id: string }
    | { type: "openShipLog", id: string }
    | { type: "prop", def: PropDefinition, value: unknown }
    | { type: "propValue", path: string, value: unknown }
    | { type: "propLookup", key: string, path: string, filter: string }
    | { type: "propLookupResults", key: string, path: string, values: [value: string, label: string][] }
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

export interface Color {
    r: number
    g: number
    b: number
    a: number
}

export interface CuriosityColors {
    color: Color
    highlightColor: Color
}

export interface BasePropDefinition {
    label?: string
}

export interface TextPropDefinition extends BasePropDefinition {
    type: "text"
    multiline?: boolean
}

export interface NumberPropDefinition extends BasePropDefinition {
    type: "number"
    min?: number
    max?: number
}

export interface ChoicePropDefinition extends BasePropDefinition {
    type: "choice"
    format: "radio" | "dropdown"
    options: [label: string, value: string][]
}

export interface LookupPropDefinition extends BasePropDefinition {
    type: "lookup"
    key: string
}

export interface TogglePropDefinition extends BasePropDefinition {
    type: "toggle"
}

export interface ColorPropDefinition extends BasePropDefinition {
    type: "color"
}

export interface ArrayPropDefinition<T extends PropDefinition> extends BasePropDefinition {
    type: "array"
    elements: T
}

export interface ObjectPropDefinition<T extends Record<string, PropDefinition>> extends BasePropDefinition {
    type: "object"
    props: T
}

export type PropDefinition = TextPropDefinition | NumberPropDefinition | ChoicePropDefinition | LookupPropDefinition | TogglePropDefinition | ColorPropDefinition | ArrayPropDefinition<any> | ObjectPropDefinition<any>

export type ObjectToPropDefinition<T> =
    T extends undefined ? never :
    T extends null ? never :
    T extends string ? TextPropDefinition | ChoicePropDefinition | LookupPropDefinition :
    T extends number ? NumberPropDefinition :
    T extends boolean ? TogglePropDefinition :
    T extends Array<infer U> ? ArrayPropDefinition<ObjectToPropDefinition<U>> :
    T extends Record<infer K, infer V> ? ObjectPropDefinition<{ [K in keyof T]: ObjectToPropDefinition<T[K]> }> :
    never

interface ShipLogEntryPropModel {
    id: string
    name: string
    isCuriosity: boolean
    curiosity: string
    ignoreMoreToExplore: boolean
    ignoreMoreToExploreCondition: string
    parentIgnoreNotRevealed: boolean
    altPhotoCondition: string
}

const shipLogEntryPropModel: ObjectToPropDefinition<ShipLogEntryPropModel> = {
    type: "object",
    props: {
        id: { type: "text" },
        name: { type: "text" },
        isCuriosity: { type: "toggle" },
        curiosity: { type: "lookup", key: "ship-log-curiosity" },
        ignoreMoreToExplore: { type: "toggle" },
        ignoreMoreToExploreCondition: { type: "lookup", key: "persistent-condition" },
        altPhotoCondition: { type: "lookup", key: "ship-log-fact" },
        parentIgnoreNotRevealed: { type: "toggle" },
    },
}

interface ShipLogRumorFactPropModel {
    id: string
    text: string
    altText: string
    altTextConditions: string[]
    ignoreMoreToExplore: boolean
    sourceID: string
    rumorName: string
    rumorNamePriority: number
}

const shipLogRumorFactPropModel: ObjectToPropDefinition<ShipLogRumorFactPropModel> = {
    type: "object",
    props: {
        id: { type: "text" },
        text: { type: "text" },
        altText: { type: "text" },
        altTextConditions: { type: "array", elements: { type: "lookup", key: "ship-log-fact" } },
        ignoreMoreToExplore: { type: "toggle" },
        sourceID: { type: "lookup", key: "ship-log-entry" },
        rumorName: { type: "text" },
        rumorNamePriority: { type: "number" },
    }
}

interface ShipLogExploreFactPropModel {
    id: string
    text: string
    altText: string
    altTextConditions: string[]
    ignoreMoreToExplore: boolean
}

const shipLogExploreFactPropModel: ObjectToPropDefinition<ShipLogExploreFactPropModel> = {
    type: "object",
    props: {
        id: { type: "text" },
        text: { type: "text" },
        altText: { type: "text" },
        altTextConditions: { type: "array", elements: { type: "lookup", key: "ship-log-fact" } },
        ignoreMoreToExplore: { type: "toggle" },
    }
}

function populateWebView(extensionUri: vscode.Uri, webview: vscode.Webview, type: WebviewType) {
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
            <link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "fonts", "SpaceMono.css"))}">
            <link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "resources", "webview.css"))}">
		</head>
		<body>
            <script nonce="${nonce}">
                const WEBVIEW_TYPE = ${JSON.stringify(type)};
                const IMAGE_URIS = ${JSON.stringify(imageUris)};
            </script>
			<script nonce="${nonce}" type="module" src="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "dist", "webview", "index.js"))}"></script>
		</body>
		</html>
	`
}

function populateShipLogWebView(extensionUri: vscode.Uri, webview: vscode.Webview, systemUri: vscode.Uri | null | undefined, entryID: string | null | undefined) {
    const disposables: vscode.Disposable[] = []

    populateWebView(extensionUri, webview, "shiplog-viewer")

    const sendMessage = (msg: WebviewMessage) => webview.postMessage(msg)

    const sendShipLogs = () => {
        const colors: Record<string, CuriosityColors | undefined> = { }
        const entries: ShipLogEntry[] = []
        const photos: Record<string, string> = {}

        const photoUri = vscode.Uri.joinPath(extensionUri, "resources", "sprites", "DEFAULT_PHOTO.png")
        photos[""] = webview.asWebviewUri(photoUri).toString()

        const system = project.systems.find(s => s.uri === systemUri)

        const isSolarSystem = system ? (system.data.name ?? getFileNameWithoutExt(system.uri)) === "SolarSystem" : true
        const destroyStockPlanets = system?.data.destroyStockPlanets ?? !isSolarSystem
        if (!system || !destroyStockPlanets) {
            Object.assign(colors, BASE_GAME_CURIOSITY_COLORS)
            
            entries.push(...BASE_GAME_ENTRIES)

            for (const entry of BASE_GAME_ENTRIES) {
                const photoUri = vscode.Uri.joinPath(extensionUri, "resources", "sprites", `${entry.id}.png`)
                photos[entry.id] = webview.asWebviewUri(photoUri).toString()
            }
        }

        if (!system) {
            sendMessage({ type: "shipLogs", colors, entries, photos })
            return
        }

        for (const curiosity of system.data.curiosities ?? []) {
            if (curiosity.id) {
                colors[curiosity.id] = {
                    color: { r: 0, g: 0, b: 0, a: 255, ...curiosity.color },
                    highlightColor: { r: 0, g: 0, b: 0, a: 255, ...curiosity.highlightColor },
                }
            }
        }

        const planets = projectActions.findPlanetsBySystem(system.uri)
        for (const planet of planets) {
            const shipLog = projectActions.findShipLogsByPlanet(planet.uri)
            if (!shipLog) {
                continue
            }
            const mainEntries = shipLog.data.Entry ?? []
            const subEntries = mainEntries.flatMap(e => e.Entry ?? [])
            const allEntries = mainEntries.concat(subEntries)

            for (const entry of allEntries) {
                const translatedName = projectTranslate(entry.Name ?? "(Nameless)", "ShipLog")
                const position = system.data.entryPositions?.find(p => entry.ID === p.id)?.position
                const parent = subEntries.includes(entry) ? mainEntries.find(m => m.Entry?.includes(entry))?.ID : undefined

                entries.push({
                    id: entry.ID ?? "",
                    name: translatedName,
                    curiosity: entry.Curiosity,
                    isCuriosity: entry.IsCuriosity,
                    astroObject: planet.data.name ?? getFileNameWithoutExt(planet.uri),
                    position: [position?.x ?? 0, position?.y ?? 0],
                    parent,
                    facts: {
                        explore: entry.ExploreFact?.map(f => ({
                            id: f.ID ?? "",
                            text: f.Text ?? "",
                        })) ?? [],
                        rumor: entry.RumorFact?.map(f => ({
                            id: f.ID ?? "",
                            text: f.Text ?? "",
                            sourceID: f.SourceID,
                        })) ?? [],
                    },
                })
                
                const photoUri = vscode.Uri.joinPath(project.manifests?.[0].uri ?? planet.uri, "..", planet.data.ShipLog?.spriteFolder ?? ".", `${entry.ID}.png`)
                photos[entry.ID ?? ""] = webview.asWebviewUri(photoUri).toString()
            }
        }

        sendMessage({ type: "shipLogs", colors, entries, photos })

        if (entryID) {
            sendMessage({ type: "selectShipLog", id: entryID })
            entryID = null
        }
    }

    disposables.push(onSelectionChanged.event(item => {
        if (!item) {
            return
        }
        switch (item.type) {
            case "ship-log-entry":
                sendMessage({ type: "selectShipLog", id: item.id })
                break
            case "ship-log-explore-fact":
            case "ship-log-rumor-fact":
                sendMessage({ type: "selectShipLog", id: item.entryID })
                break
        }
    }))

    disposables.push(onProjectChanged.event(item => {
        sendShipLogs()
    }))

    disposables.push(webview.onDidReceiveMessage((msg: WebviewMessage) => {
        switch (msg.type) {
            case "selectShipLog":
                for (const shipLog of project.shipLogs) {
                    for (const entry of shipLog.data.Entry ?? []) {
                        if (entry.ID === msg.id) {
                            projectActions.selectTreeItem({ type: "ship-log-entry", uri: shipLog.uri, id: entry.ID })
                            return
                        }
                        for (const subEntry of entry.Entry ?? []) {
                            if (subEntry.ID === msg.id) {
                                projectActions.selectTreeItem({ type: "ship-log-entry", uri: shipLog.uri, id: subEntry.ID, parentID: entry.ID })
                                return
                            }
                        }
                    }
                }
                break
            case "openShipLog":
                for (const shipLog of project.shipLogs) {
                    for (const entry of shipLog.data.Entry ?? []) {
                        if (entry.ID === msg.id) {
                            projectActions.openTreeItem({ type: "ship-log-entry", uri: shipLog.uri, id: entry.ID })
                            return
                        }
                        for (const subEntry of entry.Entry ?? []) {
                            if (subEntry.ID === msg.id) {
                                projectActions.openTreeItem({ type: "ship-log-entry", uri: shipLog.uri, id: subEntry.ID, parentID: entry.ID })
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
    }))

    return vscode.Disposable.from(...disposables)
}

function populatePropEditorWebView(extensionUri: vscode.Uri, webview: vscode.Webview) {
    const disposables: vscode.Disposable[] = []

    populateWebView(extensionUri, webview, "prop-editor")

    const sendMessage = (msg: WebviewMessage) => webview.postMessage(msg)

    disposables.push(webview.onDidReceiveMessage((msg: WebviewMessage) => {

    }))

    return vscode.Disposable.from(...disposables)
}

function getNonce() {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const shipLogPanels = new Map<string, vscode.WebviewPanel>()

export function activateWebView(context: vscode.ExtensionContext) {
	vscode.window.registerWebviewViewProvider("prop-editor", {
		resolveWebviewView(webviewView, ctx, token) {
            const customView = populatePropEditorWebView(context.extensionUri, webviewView.webview)
            webviewView.onDidDispose(() => customView.dispose())
		},
	})

    vscode.commands.registerCommand("nomai-helper.openShipLogViewer", (item: NomaiTreeItem) => {
        const systemUri = (() => {
            switch (item.type) {
                case "system":
                    return item.uri
                case "planet":
                    return projectActions.findSystemByPlanet(item.uri)?.uri
                case "ship-logs":
                case "ship-log-entry":
                case "ship-log-rumor-fact":
                case "ship-log-explore-fact":
                    const planet = projectActions.findPlanetByShipLogs(item.uri)
                    return planet ? projectActions.findSystemByPlanet(planet.uri)?.uri : null
            }
            return null
        })()

        const entryID = (() => {
            switch (item.type) {
                case "ship-log-entry":
                    return item.id
                case "ship-log-explore-fact":
                case "ship-log-rumor-fact":
                    return item.entryID
            }
            return null
        })()

        const system = project.systems.find(s => s.uri === systemUri)
        const systemName = system ? projectTranslate(system.data.name ?? getFileNameWithoutExt(system.uri), "UI") : "SolarSystem"

        const panelKey = system?.uri.toString() ?? "SolarSystem"

        const existingPanel = shipLogPanels.get(panelKey)
        if (existingPanel) {
            existingPanel.reveal()
            if (entryID) {
                existingPanel.webview.postMessage({ type: "selectShipLog", id: entryID } satisfies WebviewMessage)
            }
            return
        }

        const panel = vscode.window.createWebviewPanel("nomai-helper.ship-log-viewer", `${systemName} - Ship Log Viewer`, { viewColumn: vscode.ViewColumn.Active })
        const customView = populateShipLogWebView(context.extensionUri, panel.webview, systemUri, entryID)

        shipLogPanels.set(panelKey, panel)
        panel.onDidDispose(() => {
            customView.dispose()
            shipLogPanels.delete(panelKey)
        })
    })
}
