import { allComponents, Checkbox, Dropdown, provideVSCodeDesignSystem, TextArea, TextField } from "@vscode/webview-ui-toolkit"
import { createElement, onViewMessage, sendViewMessage } from "./shared"
import type { PropDefinition, WebviewMessage } from "../webview"

function asyncLookup(key: string, path: string, filter: string) {
    return new Promise<[value: string, label: string][]>((resolve, reject) => {
        const unsub = onViewMessage((msg: WebviewMessage) => {
            if (msg.type === "propLookupResults" && msg.key === key && msg.path === path) {
                unsub()
                resolve(msg.values)
            }
        })
        sendViewMessage({ type: "propLookup", key, path, filter })
    })
}

export function makePropEditor() {
    provideVSCodeDesignSystem().register(allComponents)

    const editorDiv = createElement("div", "prop-editor", document.body)

    const makeField = (name: string, path: string, value: unknown, def: PropDefinition) => {
        const id = path
        const fieldDiv = createElement("div", "prop-field", editorDiv)
        const fieldLabel = createElement("label", "prop-label", fieldDiv, def.label ?? name)
        fieldLabel.htmlFor = id
        switch (def.type) {
            case "text": {
                if (def.multiline) {
                    const textArea = new TextArea()
                    textArea.id = id
                    textArea.placeholder = name
                    textArea.value = String(value)
                    fieldDiv.append(textArea)
                } else {
                    const textField = new TextField()
                    textField.id = id
                    textField.placeholder = name
                    textField.value = String(value)
                    fieldDiv.append(textField)
                }
                break
            }
            case "number": {
                const textField = new TextField()
                textField.id = id
                textField.value = String(Number(value))
                fieldDiv.append(textField)
                break
            }
            case "toggle": {
                const checkbox = new Checkbox()
                checkbox.id = id
                checkbox.checked = Boolean(value)
                fieldDiv.append(checkbox)
                break
            }
            case "lookup": {
                const dropdown = new Dropdown()
                dropdown.id = id
                asyncLookup(def.key, path, "").then(values => {
                    values.forEach(([optionValue, optionLabel]) => {
                        for (const option of dropdown.options) {
                            option.remove()
                        }
                        dropdown.append(new Option(optionLabel, optionValue, undefined, optionValue === String(value)))
                    })
                })
                break
            }
            case "array": {
                const groupDiv = createElement("div", "prop-group", fieldDiv)
                const arr = Array.isArray(value) ? value : []
                for (let i = 0; i < arr.length; i++) {
                    groupDiv.append(makeField(`${i}`, `${path}.${i}`, arr[i], def.elements))
                }
                break
            }
            case "object": {
                const groupDiv = createElement("div", "prop-group", fieldDiv)
                for (const k of Object.keys(def.props)) {
                    groupDiv.append(makeField(k, `${path}.${k}`, ((value ?? {}) as any)[k], def.props[k]))
                }
                break
            }
            default: throw new Error(`Field type not implemented: ${def.type}`)
        }
        return fieldDiv
    }
}
