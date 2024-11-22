import type { WebviewType } from "../webview"
import { makePropEditor } from "./props"
import { makeShipLogViewer } from "./shiplogs"

declare const WEBVIEW_TYPE: WebviewType

switch (WEBVIEW_TYPE) {
    case "shiplog-viewer":
        makeShipLogViewer()
        break
    case "prop-editor":
        makePropEditor()
        break
    default:
        document.body.textContent = "No webview type specified"
        break
}
