import * as vscode from "vscode"
import { activateTreeView } from "./treeview"
import { activateProject } from "./project"
import { activateWebView } from "./webview"

export function activate(context: vscode.ExtensionContext) {
	activateProject(context)
	activateTreeView(context)
	activateWebView(context)
}

export function deactivate() {

}
