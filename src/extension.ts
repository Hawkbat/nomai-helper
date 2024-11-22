import * as vscode from "vscode"
import { NomaiTreeItem, NomaiTreeViewDataProvider, PlanetTreeItem } from "./treeview"
import { onProjectChanged, onProjectFileChange, onSelectionChanged, projectActions } from "./project"
import { populatePropEditorWebView, populateShipLogWebView } from "./webview"

export function activate(context: vscode.ExtensionContext) {
	const xmlWatcher = vscode.workspace.createFileSystemWatcher("**/*.xml")
	context.subscriptions.push(xmlWatcher)
	context.subscriptions.push(xmlWatcher.onDidCreate(e => onProjectFileChange(e, "create")))
	context.subscriptions.push(xmlWatcher.onDidChange(e => onProjectFileChange(e, "change")))
	context.subscriptions.push(xmlWatcher.onDidDelete(e => onProjectFileChange(e, "delete")))

	const jsonWatcher = vscode.workspace.createFileSystemWatcher("**/*.json")
	context.subscriptions.push(jsonWatcher)
	context.subscriptions.push(jsonWatcher.onDidCreate(e => onProjectFileChange(e, "create")))
	context.subscriptions.push(jsonWatcher.onDidChange(e => onProjectFileChange(e, "change")))
	context.subscriptions.push(jsonWatcher.onDidDelete(e => onProjectFileChange(e, "delete")))

	context.subscriptions.push(onSelectionChanged)
	context.subscriptions.push(onProjectChanged)

	const treeView = vscode.window.createTreeView("new-horizons", {
		treeDataProvider: new NomaiTreeViewDataProvider(),
		showCollapseAll: true,
	})
	context.subscriptions.push(treeView)
	context.subscriptions.push(treeView.onDidChangeSelection(({ selection }) => {
		if (selection.length) {
			projectActions.selectTreeItem(selection[0])
		} else {
			projectActions.selectTreeItem(null)
		}
	}))
	context.subscriptions.push(onSelectionChanged.event(item => {
		if (item && (treeView.selection.length !== 1 || treeView.selection[0] !== item)) {
			treeView.reveal(item, { select: true })
		}
	}))

	vscode.window.registerWebviewViewProvider("prop-editor", {
		resolveWebviewView(webviewView, ctx, token) {
			populatePropEditorWebView(context.extensionUri, webviewView.webview)
		},
	})

	context.subscriptions.push(vscode.commands.registerCommand("nomai-helper.openTreeItem", (item: NomaiTreeItem) => projectActions.openTreeItem(item)))
	context.subscriptions.push(vscode.commands.registerCommand("nomai-helper.addShipLogEntry", (planet: PlanetTreeItem) => projectActions.addShipLogEntry(planet)))

	vscode.workspace.findFiles("**/*.xml").then(uris => uris.forEach(uri => onProjectFileChange(uri, "find")))
	vscode.workspace.findFiles("**/*.json").then(uris => uris.forEach(uri => onProjectFileChange(uri, "find")))

	const panel = vscode.window.createWebviewPanel("nomai-helper.ship-log-viewer", "Ship Log Viewer", { viewColumn: vscode.ViewColumn.Active })
	populateShipLogWebView(context.extensionUri, panel.webview)
}

export function deactivate() {

}
