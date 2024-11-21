import * as vscode from "vscode"
import { ManifestJsonData, AddonManifestJsonData, StarSystemJsonData, PlanetJsonData, ShipLogXmlData, DialogueXmlData, TextXmlData, TranslationJsonData, shipLogXmlDefinition, dialogueXmlDefinition, textXmlDefinition, serializeShipLogXml } from "./outerwilds"
import { XmlElementNode, XmlModel, XmlNodeDefinition, xmlToJson, XmlToken } from "./xml"
import type { NomaiTreeItem, PlanetTreeItem } from "./treeview"
import { getFileNameWithoutExt } from "./utils"
import { JsonModel, JsonNode, JsonObjectNode, JsonToken } from "./json"

interface ProjectFileAsset {
	uri: vscode.Uri
}

interface ProjectJsonFileAsset<T> extends ProjectFileAsset {
	model: JsonModel
	data: T
}

interface ProjectXmlFileAsset<T> extends ProjectFileAsset {
	model: XmlModel
	data: T
}

interface ProjectJsonSubAsset<TParent extends ProjectJsonFileAsset<any> | ProjectJsonSubAsset<any, any>, TData> {
	parent: TParent
	node: JsonObjectNode
	data: TData
}

interface ProjectXmlSubAsset<TParent extends ProjectXmlFileAsset<any> | ProjectXmlSubAsset<any, any>, TData> {
	parent: TParent
	node: XmlElementNode
	data: TData
}

export interface ProjectManifest extends ProjectJsonFileAsset<ManifestJsonData> { }
export interface ProjectAddonManifest extends ProjectJsonFileAsset<AddonManifestJsonData> { }
export interface ProjectStarSystem extends ProjectJsonFileAsset<StarSystemJsonData> { }
export interface ProjectPlanet extends ProjectJsonFileAsset<PlanetJsonData> { }
export interface ProjectShipLogFile extends ProjectXmlFileAsset<ShipLogXmlData> { }
export interface ProjectDialogue extends ProjectXmlFileAsset<DialogueXmlData> { }
export interface ProjectText extends ProjectXmlFileAsset<TextXmlData> { }
export interface ProjectTranslation extends ProjectJsonFileAsset<TranslationJsonData> { }

export interface ProjectState {
	manifests: ProjectManifest[]
	addonManifests: ProjectAddonManifest[]
	systems: ProjectStarSystem[]
	planets: ProjectPlanet[]
	shipLogs: ProjectShipLogFile[]
	dialogues: ProjectDialogue[]
	texts: ProjectText[]
	translations: ProjectTranslation[]
}

type JsonProjectKeys = { [K in keyof ProjectState]-?: ProjectState[K] extends { model: JsonModel }[] ? K : never }[keyof ProjectState]

type XmlProjectKeys = { [K in keyof ProjectState]-?: ProjectState[K] extends { model: XmlModel }[] ? K : never }[keyof ProjectState]

export const project: ProjectState = {
	manifests: [],
	addonManifests: [],
	systems: [],
	planets: [],
	shipLogs: [],
	dialogues: [],
	texts: [],
	translations: [],
}

const diagCollection = vscode.languages.createDiagnosticCollection("nomai-helper")
export const onProjectChanged = new vscode.EventEmitter<NomaiTreeItem | undefined>()

function updateProject() {
	onProjectChanged.fire(undefined)
	validateProject()
}

function updateJsonProjectFile<K extends JsonProjectKeys>(key: K, uri: vscode.Uri, op: "find" | "create" | "change" | "delete", populate: (model: JsonModel, data: ProjectState[K][number]["data"]) => Omit<ProjectState[K][number], "uri" | "model" | "data">) {
	if (op === "delete") {
		project[key] = project[key].filter(f => f.uri !== uri) as ProjectState[K]
		updateProject()
	} else {
		vscode.workspace.openTextDocument(uri).then(doc => {
			const model = new JsonModel(doc.getText())
			const data: any = model.root.value
			project[key] = project[key].filter(m => m.uri !== uri).concat([{
				uri,
				model,
				data,
				...populate(model, data),
			}]) as ProjectState[K]
			updateProject()
		})
	}
}

function updateXmlProjectFile<K extends XmlProjectKeys>(key: K, uri: vscode.Uri, op: "find" | "create" | "change" | "delete", definition: XmlNodeDefinition, populate: (model: XmlModel, data: ProjectState[K][number]["data"]) => Omit<ProjectState[K][number], "uri" | "model" | "data">) {
	if (op === "delete") {
		project[key] = project[key].filter(f => f.uri !== uri) as ProjectState[K]
		updateProject()
	} else {
		vscode.workspace.openTextDocument(uri).then(doc => {
			const model = new XmlModel(doc.getText())
			const data: any = xmlToJson(definition, [model.root])
			if (data) {
				project[key] = project[key].filter(m => m.uri !== uri).concat([{
					uri,
					model,
					data,
					...populate(model, data),
				}]) as ProjectState[K]
				updateProject()
			}
		})
	}
}

export function onProjectFileChange(uri: vscode.Uri, op: "find" | "create" | "change" | "delete") {
	const parts = uri.path.replaceAll("\\", "/").split("/")
	const filename = parts.pop()
	if (filename === "manifest.json") {
		updateJsonProjectFile("manifests", uri, op, () => ({ }))
	} else if (filename === "addon-manifest.json") {
		updateJsonProjectFile("addonManifests", uri, op, () => ({ }))
	} else if (filename?.toLowerCase().endsWith(".json")) {
		while (parts.length) {
			const part = parts.pop()?.toLowerCase()
			if (part === "planets") {
				updateJsonProjectFile("planets", uri, op, () => ({ }))
				break
			} else if (part === "systems") {
				updateJsonProjectFile("systems", uri, op, () => ({ }))
				break
			} else if (part === "translations") {
				updateJsonProjectFile("translations", uri, op, () => ({ }))
				break
			}
		}
	} else if (filename?.toLowerCase().endsWith(".xml")) {
		updateXmlProjectFile("shipLogs", uri, op, shipLogXmlDefinition, () => ({ }))
		updateXmlProjectFile("dialogues", uri, op, dialogueXmlDefinition, () => ({ }))
		updateXmlProjectFile("texts", uri, op, textXmlDefinition, () => ({ }))
	}
}

function getTokenRange(token: JsonToken | XmlToken | null | undefined) {
	const range = token?.toRange()
	return new vscode.Range(range?.startLine ?? 0, range?.startCol ?? 0, range?.endLine ?? 0, range?.endCol ?? 0)
}

function getNodeRange(node: JsonNode | XmlElementNode | null | undefined) {
	if (node instanceof XmlElementNode) {
		return getTokenRange(node.openTagNode?.token)
	} else if (node instanceof JsonNode) {
		return getTokenRange(node.token)
	}
	return new vscode.Range(0, 0, 0, 0)
}

function convertToAstroObjectName(name: string) {
	name = name.toUpperCase().replaceAll(" ", "_").replaceAll("'", "")
	switch (name) {
		case "ATTLEROCK": return "TIMBER_MOON"
		case "HOLLOWS_LANTERN": return "VOLCANIC_MOON"
		case "ASH_TWIN": return "TOWER_TWIN"
		case "EMBER_TWIN": return "EMBER_TWIN"
		case "INTERLOPER": return "COMET"
		case "EYE": return "EYE_OF_THE_UNIVERSE"
		case "EYEOFTHEUNIVERSE": return "EYE_OF_THE_UNIVERSE"
		case "MAPSATELLITE": return "MapSatellite"
	}
	return name
}

function validateProject() {
	diagCollection.clear()

	project.shipLogs.forEach(s => {
		const diags: vscode.Diagnostic[] = []
		const planet = project.planets.find(p => p.data.ShipLog?.xmlFile && s.uri.path.endsWith(p.data.ShipLog?.xmlFile))
		if (!planet) {
			diags.push(new vscode.Diagnostic(getNodeRange(s.model.root), "This ship log XML file is not referenced in any planet body JSON file's 'ShipLog.xmlFile' field"))
		} else {
			const planetName = planet.data.name ?? getFileNameWithoutExt(planet.uri)
			if (s.data.ID !== planetName && s.data.ID !== convertToAstroObjectName(planetName)) {
				diags.push(new vscode.Diagnostic(getNodeRange(s.model.root.query("ID")), "'ID' element is missing or its value is not the planet's name ('name' field or filename without extension if not specified)"))
			}
		}
		diagCollection.set(s.uri, diags)
	})
}

export type TranslationType = "UI" | "ShipLog" | "Dialogue" | "Other"

export function projectTranslate(key: string, type: TranslationType) {
	const eng = project.translations.find(t => t.uri.path.toLowerCase().endsWith("english.json"))
	return eng?.data[`${type}Dictionary`]?.[key] ?? key
}

export const projectActions = {
	findSystemByPlanet: (uri: vscode.Uri) => {
		const planet = project.planets.find(p => p.uri === uri)
		return planet ? project.systems.find(s => (s.data.name ?? getFileNameWithoutExt(s.uri)) === (planet.data.starSystem ?? "SolarSystem")) : null
	},
	findPlanetsBySystem: (uri: vscode.Uri) => {
		const system = project.systems.find(s => s.uri === uri)
		return system ? project.planets.filter(p => (p.data.starSystem ?? "SolarSystem") === (system.data.name ?? getFileNameWithoutExt(system.uri))) : []
	},
	findPlanetShipLogs: (uri: vscode.Uri) => {
		const planet = project.planets.find(p => p.uri === uri)
		return planet && planet.data.ShipLog?.xmlFile ? project.shipLogs.find(s => s.uri.path.endsWith(planet.data.ShipLog!.xmlFile!)) : null
	},
	findShipLogsPlanet: (uri: vscode.Uri) => {
		const shipLogs = project.shipLogs.find(s => s.uri === uri)
		return shipLogs ? project.planets.find(p => p.data.ShipLog?.xmlFile ? shipLogs.uri.path.endsWith(p.data.ShipLog.xmlFile) : false) : null
	},
	openTreeItem: (item: NomaiTreeItem) => {
		switch (item.type) {
			case "category":
				break
			case "shiplog-entry": {
				const shipLogs = project.shipLogs.find(s => s.uri === item.uri)
				if (!shipLogs) {
					break
				}
				const node = item.parentID ? shipLogs.model.root.findAll("Entry").flatMap(e => e.findAll("Entry")).find(e => e.find("ID")?.content === item.id) : shipLogs.model.root.findAll("Entry").find(e => e.find("ID")?.content === item.id)
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true, selection: getNodeRange(node) } satisfies vscode.TextDocumentShowOptions)
				break
			}
			case "shiplog-explore-fact": {
				const shipLogs = project.shipLogs.find(s => s.uri === item.uri)
				if (!shipLogs) {
					break
				}
				const entryNode = shipLogs.model.root.findAll("Entry").flatMap(e => e.findAll("Entry")).find(e => e.find("ID")?.content === item.entryID) ?? shipLogs.model.root.findAll("Entry").find(e => e.find("ID")?.content === item.entryID)
				const factNode = entryNode?.findAll("ExploreFact").find(e => e.find("ID")?.content === item.id)
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true, selection: getNodeRange(factNode) } satisfies vscode.TextDocumentShowOptions)
				break
			}
			case "shiplog-rumor-fact": {
				const shipLogs = project.shipLogs.find(s => s.uri === item.uri)
				if (!shipLogs) {
					break
				}
				const entryNode = shipLogs.model.root.findAll("Entry").flatMap(e => e.findAll("Entry")).find(e => e.find("ID")?.content === item.entryID) ?? shipLogs.model.root.findAll("Entry").find(e => e.find("ID")?.content === item.entryID)
				const factNode = entryNode?.findAll("RumorFact").find(e => e.find("ID")?.content === item.id)
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true, selection: getNodeRange(factNode) } satisfies vscode.TextDocumentShowOptions)
				break
			}
			case "dialogue-node": {
				const dialogue = project.dialogues.find(d => d.uri === item.uri)
				const node = dialogue?.model.root.findAll("DialogueNode").find(n => n.find("Name")?.content === item.name)
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true, selection: getNodeRange(node) } satisfies vscode.TextDocumentShowOptions)
				break
			}
			case "text-node": {
				const text = project.texts.find(t => t.uri === item.uri)
				const node = text?.model.root.findAll("TextBlock").find(b => b.find("ID")?.content === item.id.toString())
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true, selection: getNodeRange(node) } satisfies vscode.TextDocumentShowOptions)
				break
			}
			default:
				vscode.commands.executeCommand("vscode.openWith", item.uri, "default", { preview: true } satisfies vscode.TextDocumentShowOptions)
				break
		}
	},
	addShipLogEntry: (planetTreeItem: PlanetTreeItem) => {
		const planet = project.planets.find(p => p.uri === planetTreeItem.uri)
		if (!planet) {
			return
		}
		const edit = new vscode.WorkspaceEdit()
		const shipLog = project.shipLogs.find(s => s.data.ID === (planet.data.name ?? getFileNameWithoutExt(planet.uri)) || (planet.data.ShipLog?.xmlFile && s.uri.path.endsWith(planet.data.ShipLog.xmlFile)))
		if (!shipLog) {
			const uri = vscode.Uri.from({
				...planet.uri,
				path: planet.uri.path.replace(".json", ".xml"),
			})
			const data: ShipLogXmlData = {
				ID: planet.data.name ?? getFileNameWithoutExt(planet.uri),
				Entry: [
					{
						ID: "NEW_ENTRY",
						Name: "New Entry",
					}
				]
			}
			edit.createFile(uri, { contents: new TextEncoder().encode(serializeShipLogXml(data)) }, { label: "Add Ship Log Entry", needsConfirmation: true })
		} else {
			const data: ShipLogXmlData = {
				...shipLog.data,
				Entry: [
					...(shipLog.data.Entry ?? []),
					{
						ID: "NEW_ENTRY",
						Name: "New Entry",
					}
				]
			}
			edit.replace(shipLog.uri, new vscode.Range(0, 0, 99999999, 99999999), serializeShipLogXml(data) ?? "", { label: "Add Ship Log Entry", needsConfirmation: false })
		}
		vscode.workspace.applyEdit(edit).then(() => updateProject())
	}
}
