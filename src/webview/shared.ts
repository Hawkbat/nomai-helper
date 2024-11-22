import type { WebviewMessage, WebviewImageUris } from "../webview"

declare const IMAGE_URIS: WebviewImageUris

export function getImageUri(key: keyof WebviewImageUris) {
    return IMAGE_URIS[key]
}

interface WebviewState {
    canvas: {
        scrollLeft: number
        scrollTop: number
    }
}

const vscode = acquireVsCodeApi()

let state: WebviewState = (vscode.getState() as WebviewState | undefined) ?? {
    canvas: {
        scrollLeft: 0,
        scrollTop: 0,
    },
}

export const sendViewMessage = (msg: WebviewMessage) => vscode.postMessage(msg)

export const onViewMessage = (listener: (msg: WebviewMessage) => void) => {
    const callback = (e: MessageEvent<any>) => listener(e.data)
    window.addEventListener("message", callback)
    return () => window.removeEventListener("message", callback)
}

export function getViewState() {
    return state
}

export function updateViewState(setter: (state: WebviewState) => WebviewState) {
    state = setter(state)
    vscode.setState(state)
}

export function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, parent: Element, text?: string): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag)
    el.className = className
    parent.append(el)
    if (text) {
        el.textContent = text
    }
    return el
}
