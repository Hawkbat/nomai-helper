import * as vscode from "vscode"
import { onProjectChanged, project, projectActions, projectTranslate } from "./project"
import { getFileNameWithoutExt } from "./utils"

interface BaseTreeItem {
	uri: vscode.Uri
}

export interface ManifestTreeItem extends BaseTreeItem {
	type: "manifest"
}

export interface AddonManifestTreeItem extends BaseTreeItem {
	type: "addon-manifest"
}

export interface PlanetTreeItem extends BaseTreeItem {
	type: "planet"
}

export interface StarSystemTreeItem extends BaseTreeItem {
	type: "system"
}

export interface ShipLogsTreeItem extends BaseTreeItem {
	type: "ship-logs"
}

export interface ShipLogEntryTreeItem extends BaseTreeItem {
	type: "ship-log-entry"
	id: string
	parentID?: string
}

export interface ShipLogRumorFactTreeItem extends BaseTreeItem {
	type: "ship-log-rumor-fact"
	id: string
	entryID: string
}

export interface ShipLogExploreFactTreeItem extends BaseTreeItem {
	type: "ship-log-explore-fact"
	id: string
	entryID: string
}

export interface DialogueTreeItem extends BaseTreeItem {
	type: "dialogue"
}

export interface DialogueNodeTreeItem extends BaseTreeItem {
	type: "dialogue-node"
	name: string
}

export interface TextTreeItem extends BaseTreeItem {
	type: "text"
}

export interface TextNodeTreeItem extends BaseTreeItem {
	type: "text-node"
	id: number
}

export interface TranslationTreeItem extends BaseTreeItem {
	type: "translation"
}

export interface CategoryTreeItem {
	type: "category"
	category: "system" | "dialogue" | "text" | "translation"
}

export type NomaiTreeItem = ManifestTreeItem | AddonManifestTreeItem | PlanetTreeItem | StarSystemTreeItem | ShipLogsTreeItem | ShipLogEntryTreeItem | ShipLogRumorFactTreeItem | ShipLogExploreFactTreeItem | DialogueTreeItem | DialogueNodeTreeItem | TextTreeItem | TextNodeTreeItem | TranslationTreeItem | CategoryTreeItem

const treeItemCache = new Map<string, NomaiTreeItem>()

function getTreeItemID(item: NomaiTreeItem) {
	switch (item.type) {
		case "manifest":
		case "addon-manifest":
		case "planet":
		case "system":
		case "ship-logs":
		case "dialogue":
		case "text":
		case "translation":
			return `${item.type}$${item.uri}`
		case "ship-log-entry":
			return `${item.type}$${item.uri}$${item.id}`
		case "ship-log-explore-fact":
			return `${item.type}$${item.uri}$${item.id}$${item.entryID}`
		case "ship-log-rumor-fact":
			return `${item.type}$${item.uri}$${item.id}$${item.entryID}`
		case "dialogue-node":
			return `${item.type}$${item.uri}$${item.name}`
		case "text-node":
			return `${item.type}$${item.uri}$${item.id}`
		case "category":
			return `${item.type}$${item.category}`
	}
}

export function getCachedTreeItem<T extends NomaiTreeItem>(item: T) {
	const id = getTreeItemID(item)
	const existingItem = treeItemCache.get(id)
	if (existingItem) {
		return existingItem as T
	}
	treeItemCache.set(id, item)
	return item
}

export class NomaiTreeViewDataProvider implements vscode.TreeDataProvider<NomaiTreeItem> {
	onDidChangeTreeData: vscode.Event<void | NomaiTreeItem | NomaiTreeItem[] | null | undefined> | undefined = onProjectChanged.event

	getTreeItem(element: NomaiTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		if (element.type === "category") {
			const treeItem = new vscode.TreeItem({
				system: "Systems",
				dialogue: "Dialogues",
				text: "Texts",
				translation: "Translations",
			}[element.category], vscode.TreeItemCollapsibleState.Expanded)
			treeItem.iconPath = vscode.ThemeIcon.Folder
			treeItem.contextValue = `category-${element.category}`
			return treeItem
		}
		const hasChildren = !["manifest", "addon-manifest", "ship-log-rumor-fact", "ship-log-explore-fact", "dialogue-node", "text-node", "translation"].includes(element.type)
		const treeItem = new vscode.TreeItem(element.uri, hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None)

		treeItem.command = {
			command: "nomai-helper.treeItemClick",
			arguments: [element],
			title: "Click",
		}
		treeItem.contextValue = element.type
		treeItem.label = (() => {
			switch (element.type) {
				case "system": return projectTranslate(project.systems.find(s => s.uri === element.uri)?.data.name ?? getFileNameWithoutExt(element.uri), "UI")
				case "planet": return projectTranslate(project.planets.find(s => s.uri === element.uri)?.data.name ?? getFileNameWithoutExt(element.uri), "UI")
				case "ship-log-entry": return projectTranslate(project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.find(e => e.ID === element.id)?.ID ?? project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.flatMap(e => e.Entry ?? []).find(e => e.ID === element.id)?.ID ?? "(ID-less Entry)", "ShipLog")
				case "ship-log-rumor-fact": return project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.find(e => e.ID === element.entryID)?.RumorFact?.find(f => f.ID === element.id)?.ID ?? project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.flatMap(e => e.Entry ?? []).find(e => e.ID === element.entryID)?.RumorFact?.find(f => f.ID === element.id)?.ID ?? "(ID-less Rumor Fact)"
				case "ship-log-explore-fact": return project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.find(e => e.ID === element.entryID)?.ExploreFact?.find(f => f.ID === element.id)?.ID ?? project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.flatMap(e => e.Entry ?? []).find(e => e.ID === element.entryID)?.ExploreFact?.find(f => f.ID === element.id)?.ID ?? "(ID-less Explore Fact)"
				case "dialogue-node": return project.dialogues.find(d => d.uri === element.uri)?.data.DialogueNode?.find(n => n.Name === element.name)?.Name ?? "(ID-less Dialogue Node)"
				case "text-node": return project.texts.find(d => d.uri === element.uri)?.data.TextBlock?.find(n => n.ID === element.id)?.ID?.toString() ?? "(ID-less Text Block)"
				default: return getFileNameWithoutExt(element.uri)
			}
		})()
		return treeItem
	}

	getChildren(element?: NomaiTreeItem | undefined): vscode.ProviderResult<NomaiTreeItem[]> {
		if (!element) {
			return [
				...project.manifests.map(m => getCachedTreeItem({ type: "manifest", uri: m.uri, data: m.data, model: m.model })),
				...project.addonManifests.map(m => getCachedTreeItem({ type: "addon-manifest" as const, uri: m.uri, data: m.data, model: m.model })),
				getCachedTreeItem({ type: "category", category: "system" }),
				getCachedTreeItem({ type: "category", category: "dialogue" }),
				getCachedTreeItem({ type: "category", category: "text" }),
				getCachedTreeItem({ type: "category", category: "translation" }),
			]
		}
		const children = ((): NomaiTreeItem[] => {
			switch (element.type) {
				case "manifest":
				case "addon-manifest":
				case "ship-log-rumor-fact":
				case "ship-log-explore-fact":
				case "dialogue-node":
				case "text-node":
				case "translation":
					return []
				case "category": {
					switch (element.category) {
						case "system": return project.systems.map(s => ({ type: "system", uri: s.uri }))
						case "dialogue": return project.dialogues.map(d => ({ type: "dialogue", uri: d.uri }))
						case "text": return project.texts.map(t => ({ type: "text", uri: t.uri }))
						case "translation": return project.translations.map(t => ({ type: "translation", uri: t.uri }))
					}
				}
				case "system": return projectActions.findPlanetsBySystem(element.uri).map(p => ({ type: "planet", uri: p.uri }))
				case "planet":
					const shipLogs = projectActions.findPlanetShipLogs(element.uri)
					return shipLogs?.data.Entry?.map(e => ({ type: "ship-log-entry", uri: shipLogs?.uri, id: e.ID ?? "" })) ?? []
				case "ship-logs":
					return project.shipLogs.find(s => s.uri === element.uri)?.data?.Entry?.map(e => ({ type: "ship-log-entry", uri: element.uri, id: e.ID ?? "" })) ?? []
				case "ship-log-entry":
					const entryData = project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.find(e => e.ID === element.id)
					const subEntryData = project.shipLogs.find(s => s.uri === element.uri)?.data.Entry?.find(e => e.ID === element.parentID)?.Entry?.find(e => e.ID === element.id)
					const rumorFacts: ShipLogRumorFactTreeItem[] = (entryData ?? subEntryData)?.RumorFact?.map(f => ({ type: "ship-log-rumor-fact", uri: element.uri, id: f.ID ?? "", entryID: (entryData ?? subEntryData)?.ID ?? "" })) ?? []
					const exploreFacts: ShipLogExploreFactTreeItem[] = (entryData ?? subEntryData)?.ExploreFact?.map(f => ({ type: "ship-log-explore-fact", uri: element.uri, id: f.ID ?? "", entryID: (entryData ?? subEntryData)?.ID ?? "" })) ?? []
					const subEntries: ShipLogEntryTreeItem[] = entryData?.Entry?.map(e => ({ type: "ship-log-entry", uri: element.uri, id: e.ID ?? "", parentID: entryData?.ID ?? "" })) ?? []
					return [...rumorFacts, ...exploreFacts, ...subEntries]
				case "dialogue": return project.dialogues.find(d => d.uri === element.uri)?.data.DialogueNode?.map(n => ({ type: "dialogue-node", uri: element.uri, name: n.Name ?? "" })) ?? []
				case "text": return project.texts.find(d => d.uri === element.uri)?.data.TextBlock?.map(n => ({ type: "text-node", uri: element.uri, id: n.ID ?? 0 })) ?? []
			}
			throw new Error(`Unsupported tree item type ${JSON.stringify(element)}`)
		})().map(i => getCachedTreeItem(i))
		children.sort((a, b) => a.type !== "category" && b.type !== "category" ? a.uri.toString().localeCompare(b.uri.toString()) : 0)
		return children
	}

	getParent(element: NomaiTreeItem): vscode.ProviderResult<NomaiTreeItem> {
		const parent = ((): NomaiTreeItem | null => {
			switch (element.type) {
				case "manifest":
				case "addon-manifest":
				case "category":
					return null
				case "system":
				case "dialogue":
				case "text":
				case "translation":
					return { type: "category", category: element.type }
				case "planet":
					const system = projectActions.findSystemByPlanet(element.uri)
					return system ? { type: "system", uri: system.uri } : null
				case "ship-logs":
					const planet = projectActions.findShipLogsPlanet(element.uri)
					return planet ? { type: "planet", uri: planet.uri } : null
				case "ship-log-entry":
					if (element.parentID) {
						return { type: "ship-log-entry", uri: element.uri, id: element.parentID }
					} else {
						const planet = projectActions.findShipLogsPlanet(element.uri)
						return planet ? { type: "planet", uri: planet.uri } : null
					}
				case "ship-log-explore-fact":
				case "ship-log-rumor-fact":
					return { type: "ship-log-entry", uri: element.uri, id: element.entryID }
				case "dialogue-node":
					return { type: "dialogue", uri: element.uri }
				case "text-node":
					return { type: "text", uri: element.uri }
			}
			return null
		})()
		if (parent) {
			return getCachedTreeItem(parent)
		}
		return parent
	}

	resolveTreeItem(item: vscode.TreeItem, element: NomaiTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
		return undefined
	}
}
