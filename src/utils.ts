import * as vscode from "vscode"

export function getFileNameWithoutExt(uri: vscode.Uri) {
	const parts = uri.path.replaceAll("\\", "/").split("/")
	const filename = parts.pop()
	return filename?.substring(0, filename.lastIndexOf(".")) ?? filename ?? ""
}
