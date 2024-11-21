
export class XmlDefinitionBuilder<TN extends string, T extends Record<string, XmlNodeDefinition<any, any, any, any>> = {}> {
    constructor(readonly name: TN, readonly nodes: T = {} as T) {

    }

    string<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "string", R, {}>>> {
        this.setNode(name, { name, type: "string", required: required ?? false, children: {} })
        return this
    }

    stringArray<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "string-array", R, {}>>> {
        this.setNode(name, { name, type: "string-array", required: required ?? false, children: {} })
        return this
    }

    number<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "number", R, {}>>> {
        this.setNode(name, { name, type: "number", required: required ?? false, children: {} })
        return this
    }

    numberArray<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "number-array", R, {}>>> {
        this.setNode(name, { name, type: "number-array", required: required ?? false, children: {} })
        return this
    }

    boolean<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "boolean", R, {}>>> {
        this.setNode(name, { name, type: "boolean", required: required ?? false, children: {} })
        return this
    }

    booleanArray<N extends string, R extends boolean>(name: N, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "boolean-array", R, {}>>> {
        this.setNode(name, { name, type: "boolean", required: required ?? false, children: {} })
        return this
    }

    object<N extends string, C extends Record<string, XmlNodeDefinition>, R extends boolean>(name: N, build: (builder: XmlDefinitionBuilder<N>) => XmlDefinitionBuilder<N, C>, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "object", R, C>>> {
        const children = build(new XmlDefinitionBuilder(name, {})).nodes
        this.setNode(name, { name, type: "object", required: required ?? false, children })
        return this
    }

    objectArray<N extends string, C extends Record<string, XmlNodeDefinition>, R extends boolean>(name: N, build: (builder: XmlDefinitionBuilder<N>) => XmlDefinitionBuilder<N, C>, required?: R): XmlDefinitionBuilder<TN, T & Record<N, XmlNodeDefinition<N, "object-array", R, C>>> {
        const children = build(new XmlDefinitionBuilder(name, {})).nodes
        this.setNode(name, { name, type: "object-array", required: required ?? false, children })
        return this
    }

    build(): XmlNodeDefinition<TN, "object", true, T> {
        return {
            name: this.name,
            type: "object",
            required: true,
            children: this.nodes,
        }
    }

    private setNode(name: string, def: XmlNodeDefinition) {
        const obj = this.nodes as any
        obj[name] = def
    }
}

export function jsonToXml<D extends XmlNodeDefinition>(definition: D, data: XmlDefinitionToJson<D>): XmlElementNode[] | XmlElementNode | undefined {
    switch (definition.type as XmlNodeDefinitionType) {
        case "string": {
            if (data === null || data === undefined) {
                return undefined
            }
            const node = new XmlElementNode(null, null, null, [])
            node.name = definition.name
            node.content = data.toString()
            return node
        }
        case "number": {
            if (data === null || data === undefined) {
                return undefined
            }
            const node = new XmlElementNode(null, null, null, [])
            node.name = definition.name
            node.content = data.toString()
            return node
        }
        case "boolean": {
            if (data) {
                const node = new XmlElementNode(null, null, null, [])
                node.name = definition.name
                node.selfClosing = true
                return node
            } else {
                return undefined
            }
        }
        case "object": {
            if (data === null || data === undefined) {
                return undefined
            }
            const node = new XmlElementNode(null, null, null, [])
            node.name = definition.name
            for (const [k, v] of Object.entries(definition.children)) {
                const childNode = jsonToXml(v as XmlNodeDefinition, (data as any)[k])
                if (childNode) {
                    if (Array.isArray(childNode)) {
                        node.childNodes.push(...childNode)
                    } else {
                        node.childNodes.push(childNode)
                    }
                }
            }
            return node
        }
        case "string-array": {
            return Array.isArray(data) ? data.map(d => {
                if (d === null || d === undefined) {
                    return undefined
                }
                const node = new XmlElementNode(null, null, null, [])
                node.name = definition.name
                node.content = d.toString()
                return node
            }).filter(n => n !== undefined) : undefined
        }
        case "number-array": {
            return Array.isArray(data) ? data.map(d => {
                if (d === null || d === undefined) {
                    return undefined
                }
                const node = new XmlElementNode(null, null, null, [])
                node.name = definition.name
                node.content = d.toString()
                return node
            }).filter(n => n !== undefined) : undefined
        }
        case "boolean-array": {
            return Array.isArray(data) ? data.map(d => {
                if (d) {
                    const node = new XmlElementNode(null, null, null, [])
                    node.name = definition.name
                    node.selfClosing = true
                    return node
                } else {
                    return undefined
                }
            }).filter(n => n !== undefined) : undefined
        }
        case "object-array": {
            return Array.isArray(data) ? data.map(d => {
                if (d === null || d === undefined) {
                    return undefined
                }
                const node = new XmlElementNode(null, null, null, [])
                node.name = definition.name
                for (const [k, v] of Object.entries(definition.children)) {
                    const childNode = jsonToXml(v as XmlNodeDefinition, (d as any)[k])
                    if (childNode) {
                        if (Array.isArray(childNode)) {
                            node.childNodes.push(...childNode)
                        } else {
                            node.childNodes.push(childNode)
                        }
                    }
                }
                return node
            }).filter(n => n !== undefined) : undefined
        }
    }
}

export function xmlToJson<D extends XmlNodeDefinition>(definition: D, nodes: XmlElementNode[]): XmlDefinitionToJson<D> | undefined {
    const matches = nodes.filter(n => n.name === definition.name)
    const firstMatch = matches[0]
    switch (definition.type as XmlNodeDefinitionType) {
        case "string":
            return (firstMatch?.content ?? undefined) as XmlDefinitionToJson<D> | undefined
        case "number": {
            const str = firstMatch?.content
            const num = str ? parseFloat(str) : undefined
            return (num ?? undefined) as XmlDefinitionToJson<D> | undefined
        }
        case "boolean":
            return (firstMatch ? true : undefined) as XmlDefinitionToJson<D> | undefined
        case "object": {
            const n = firstMatch
            return (n ? Object.fromEntries(Object.entries(definition.children).map(([k, v]) => [k, xmlToJson(v as XmlNodeDefinition, n.childNodes)])) : undefined) as XmlDefinitionToJson<D> | undefined
        }
        case "string-array":
            return matches.map(m => m.content) as XmlDefinitionToJson<D> | undefined
        case "number-array":
            return matches.map(m => {
                const str = m.content
                const num = str ? parseFloat(str) : undefined
                return num
            }).filter(n => n !== undefined) as XmlDefinitionToJson<D> | undefined
        case "boolean-array":
            return matches.map(() => true) as XmlDefinitionToJson<D> | undefined
        case "object-array": {
            return matches.map(n => Object.fromEntries(Object.entries(definition.children).map(([k, v]) => [k, xmlToJson(v as XmlNodeDefinition, n.childNodes)]))) as XmlDefinitionToJson<D> | undefined
        }
    }
}

export type XmlNodeDefinitionType = "string" | "number" | "boolean" | "object" | "string-array" | "number-array" | "boolean-array" | "object-array"

export interface XmlNodeDefinition<N extends string = any, T extends XmlNodeDefinitionType = any, R extends boolean = any, C extends Record<string, XmlNodeDefinition> = any> {
    name: N
    type: T
    required: R
    children: C
}

export type XmlDefinitionToJson<T extends XmlNodeDefinition> =
    T extends XmlNodeDefinition<infer N, infer T, infer R, infer C> ?
        T extends "string" ? string
        : T extends "number" ? number
        : T extends "boolean" ? boolean
        : T extends "object" ? {
            [K in keyof C]?: XmlDefinitionToJson<C[K]>
        }
        : T extends "string-array" ? string[]
        : T extends "number-array" ? number[]
        : T extends "boolean-array" ? boolean[]
        : T extends "object-array" ? {
            [K in keyof C]?: XmlDefinitionToJson<C[K]>
        }[]
        : never
    : never

export class XmlToken {
    constructor(
        protected readonly model: XmlModel,
        readonly start: number,
        readonly end: number,
    ) {

    }

    toRange() {
        let startLine = 0
        let startCol = 0
        for (let i = 0; i < this.start; i++) {
            if (this.model.text[i] === "\n") {
                startLine++
                startCol = 0
            } else {
                startCol++
            }
        }
        let endLine = 0
        let endCol = 0
        for (let i = 0; i < this.end; i++) {
            if (this.model.text[i] === "\n") {
                endLine++
                endCol = 0
            } else {
                endCol++
            }
        }
        return { startLine, startCol, endLine, endCol }
    }

    toString() {
        return this.model.text.substring(this.start, this.end)
    }
}

export class XmlElementNode {
    name: string
    content: string
    attributes: Record<string, string>
    selfClosing: boolean

    constructor(
        readonly openTagNode: XmlTagNode | null,
        readonly closeTagNode: XmlTagNode | null,
        readonly contentNode: XmlContentNode | null,
        readonly childNodes: XmlElementNode[],
    ) {
        this.name = openTagNode?.name ?? ""
        this.content = contentNode?.content ?? ""
        this.attributes = openTagNode?.attributes ?? {}
        this.selfClosing = openTagNode?.type === "self-closing"
    }

    find(name: string, index: number = 0): XmlElementNode | null {
        return this.childNodes.filter(n => n.name === name)[index] ?? null
    }

    findAll(name: string): XmlElementNode[] {
        return this.childNodes.filter(n => n.name === name)
    }

    query(query: string): XmlElementNode | null {
        const segments = query.split("/")
        let target: XmlElementNode | null = this
        while (segments.length && target) {
            const segment = segments.shift()!
            if (segment.includes(":")) {
                const [name, index] = segment.split(":")
                target = target.find(name, parseInt(index))
            } else if (segment && segment !== ".") {
                target = target.find(segment)
            }
        }
        return target
    }

    queryAll(query: string): XmlElementNode[] {
        const segments = query.split("/")
        let targets: XmlElementNode[] = [this]
        while (segments.length && targets.length) {
            const segment = segments.shift()!
            if (segment.includes(":")) {
                const [name, index] = segment.split(":")
                targets = targets.flatMap(t => t.find(name, parseInt(index))).filter(n => !!n)
            } else if (segment && segment !== ".") {
                targets = targets.flatMap(t => t.findAll(segment)).filter(n => !!n)
            }
        }
        return targets
    }

    toString(): string {
        const attrText = Object.entries(this.attributes).map(([k, v]) => ` ${k}=${escapeXmlStringDouble(v)}`).join("")
        if (this.selfClosing) {
            return `<${this.name}${attrText}/>`
        } else if (this.childNodes.length) {
            return `<${this.name}${attrText}>${escapeXmlContent(this.content)}\n${this.childNodes.flatMap(c => c.toString().split("\n")).map(s => `\t${s}`).join("\n")}\n</${this.name}>`
        } else {
            return `<${this.name}${attrText}>${escapeXmlContent(this.content)}</${this.name}>`
        }
    }
}

export class XmlContentNode {
    content: string

    constructor(
        readonly token: XmlToken | null
    ) {
        this.content = unescapeXmlContent(token?.toString() ?? "")
    }
}

export class XmlTagNode {
    name: string
    attributes: Record<string, string> = {}

    constructor(
        readonly token: XmlToken | null,
        readonly type: "open" | "close" | "self-closing",
        readonly attributeNodes: XmlAttributeNode[],
        readonly nameNode: XmlIdentifierNode | null,
    ) {
        this.attributes = this.attributeNodes.reduce((p, c) => ({ ...p, [c.name]: c.value }), {} as Record<string, string>)
        this.name = nameNode?.name ?? ""
    }
}

export class XmlAttributeNode {
    name: string 
    value: string

    constructor(
        readonly nameNode: XmlIdentifierNode | null,
        readonly valueNode: XmlStringNode | null,
    ) {
        this.name = nameNode?.name ?? ""
        this.value = valueNode?.value ?? ""
    }
}

export class XmlIdentifierNode {
    name: string

    constructor(
        readonly token: XmlToken | null
    ) {
        this.name = token?.toString() ?? ""
    }
}

export class XmlStringNode {
    value: string

    constructor(
        readonly token: XmlToken | null,
        readonly type: "double" | "single",
    ) {
        if (type === "single") {
            this.value = unescapeXmlStringSingle(token?.toString() ?? "")
        } else {
            this.value = unescapeXmlStringDouble(token?.toString() ?? "")
        }
    }
}

const CDATA_START = "<![CDATA["
const CDATA_END = "]]>"

function replaceXmlEscapes(text: string, escapes: [string, string][]) {
    let out = ""
    let i = 0
    const is = (char: string) => text.substring(i, i + char.length) === char
    let cdata = false
    while (i < text.length) {
        if (!cdata && is(CDATA_START)) {
            cdata = true
            out += CDATA_START
            i += CDATA_START.length
        } else if (cdata && is(CDATA_END)) {
            cdata = false
            out += CDATA_END
            i += CDATA_END.length
        } else if (!cdata) {
            let escaped = false
            for (const [k, v] of escapes) {
                if (is(k)) {
                    if (k === "&" && is("&#")) {
                        continue
                    }
                    out += v
                    i += k.length
                    escaped = true
                    break
                }
            }
            if (!escaped) {
                out += text[i]
                i++
            }
        } else {
            out += text[i]
            i++
        }
    }
    return out
}

function escapeXmlContent(value: string) {
    return replaceXmlEscapes(value, [["&", "&amp;"], ["\"", "&quot;"], ["'", "&apos;"], ["<", "&lt;"], [">", "&gt;"]])
}

function unescapeXmlContent(value: string) {
    return replaceXmlEscapes(value, [["&gt;", ">"], ["&lt;", "<"], ["&apos;", "'"], ["&quot;", "\""], ["&amp;", "&"]])
}

function escapeXmlStringDouble(value: string) {
    return `"${replaceXmlEscapes(value, [["&", "&amp;"], ["\"", "&quot;"], ["<", "&lt;"]])}"`
}

function unescapeXmlStringDouble(value: string) {
    if (!value) {
        return ""
    }
    if (value.startsWith("\"") && value.endsWith("\"")) {
        value = value.substring(1, value.length - 1)
    }
    return replaceXmlEscapes(value, [["&lt;", "<"], ["&quot;", "\""], ["&amp;", "&"]])
}

function escapeXmlStringSingle(value: string) {
    return `'${replaceXmlEscapes(value, [["&", "&amp;"], ["'", "&apos;"], ["<", "&lt;"]])}'`
}

function unescapeXmlStringSingle(value: string) {
    if (!value) {
        return ""
    }
    if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1)
    }
    return replaceXmlEscapes(value, [["&lt;", "<"], ["&apos;", "'"], ["&amp;", "&"]])
}

export class XmlModel {
    root: XmlElementNode

    constructor(readonly text: string) {
        let i = 0
    
        const is = (char: string) => text.substring(i, i + char.length) === char
        const isAny = (...chars: string[]) => chars.some(c => text.substring(i, i + c.length) === c)
        const isWhitespace = () => isAny(" ", "\t", "\r", "\n")

        const ensure = (char: string) => {
            if (is(char)) {
                return true
            }
            throw new Error(`Unparseable XML at ${JSON.stringify(text.substring(i - 20, i))}`)
        }
    
        const skipWhitespace = () => {
            while (isWhitespace()) {
                i++
            }
        }
    
        const parseIdentifier = () => {
            const start = i
            while (!isAny("/", ">", "=") && !isWhitespace()) {
                i++
            }
            const end = i
            return new XmlIdentifierNode(new XmlToken(this, start, end))
        }
    
        const parseAttribute = () => {
            const nameNode = parseIdentifier()
            skipWhitespace()
            let valueNode: XmlStringNode | null = null
            if (is("=")) {
                i++
                skipWhitespace()
                if (is("\"")) {
                    valueNode = parseStringDouble()
                } else if (is("'")) {
                    valueNode = parseStringSingle()
                }
            }
            return new XmlAttributeNode(nameNode, valueNode)
        }
    
        const parseTag = () => {
            const start = i
            if (ensure("<")) {
                i++
            }
            let type: XmlTagNode["type"] = "open"
            if (is("/")) {
                type = "close"
                i++
            }
            skipWhitespace()
            const nameNode = parseIdentifier()
            skipWhitespace()
            const attributeNodes: XmlAttributeNode[] = []
            while (!isAny("/", ">")) {
                attributeNodes.push(parseAttribute())
                skipWhitespace()
            }
            if (is("/")) {
                type = "self-closing"
                i++
            }
            if (ensure(">")) {
                i++
            }
            const end = i
            return new XmlTagNode(new XmlToken(this, start, end), type, attributeNodes, nameNode)
        }
    
        const parseElement = () => {
            const openTagNode = parseTag()
            if (openTagNode.type === "self-closing") {
                return new XmlElementNode(openTagNode, null, null, [])
            }
            const contentNode = parseContent()
            const childNodes: XmlElementNode[] = []
            while (true) {
                let rollbackI = i
                const closeTagNode = parseTag()
                if (closeTagNode.type !== "close") {
                    i = rollbackI
                    const childNode = parseElement()
                    childNodes.push(childNode)
                    skipWhitespace()
                    continue
                }
                return new XmlElementNode(openTagNode, closeTagNode, contentNode, childNodes)
            }
        }
    
        const parseContent = () => {
            const start = i
            while (i < text.length) {
                if (is(CDATA_START)) {
                    while (i < text.length && !is(CDATA_END)) {
                        i++
                    }
                    if (is(CDATA_END)) {
                        i += CDATA_END.length
                    }
                } else if (is("<")) {
                    break
                } else {
                    i++
                }
            }
            const end = i
            return new XmlContentNode(new XmlToken(this, start, end))
        }
    
        const parseStringSingle = () => {
            const start = i
            if (ensure("'")) {
                i++
            }
            while (!is("'")) {
                i++
            }
            if (ensure("'")) {
                i++
            }
            const end = i
            return new XmlStringNode(new XmlToken(this, start, end), "single")
        }
    
        const parseStringDouble = () => {
            const start = i
            if (ensure("\"")) {
                i++
            }
            while (!is("\"")) {
                i++
            }
            if (ensure("\"")) {
                i++
            }
            const end = i
            return new XmlStringNode(new XmlToken(this, start, end), "double")
        }
    
        skipWhitespace()
        this.root = parseElement()
    }
}
