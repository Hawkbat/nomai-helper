import * as JSON5 from "json5"

export class JsonToken {
    constructor(
        protected readonly model: JsonModel,
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

export abstract class JsonNode {
    value: unknown

    constructor(
        readonly token: JsonToken | null,
    ) {
        if (token) {
            try {
                this.value = JSON5.parse(token.toString())
            } catch (err) {
                console.error(err)
            }
        }
    }

    toString() {
        return JSON5.stringify(this.value, undefined, "\t")
    }
}

export class JsonPrimitiveNode extends JsonNode {

}

export class JsonArrayNode extends JsonNode {
    constructor(
        readonly token: JsonToken | null,
        readonly childNodes: JsonNode[],
    ) {
        super(token)
    }

    find(index: number): JsonNode | null {
        return this.childNodes[index] ?? null
    }
}

export class JsonKeyValueNode {
    key: string
    value: unknown

    constructor(
        readonly keyNode: JsonNode | null,
        readonly valueNode: JsonNode | null,
    ) {
        this.key = String(keyNode?.value) ?? ""
        this.value = valueNode?.value
    }
} 

export class JsonObjectNode extends JsonNode {
    constructor(
        readonly token: JsonToken | null,
        readonly childNodes: JsonKeyValueNode[],
    ) {
        super(token)
    }

    find(key: string, index: number = 0): JsonNode | null {
        return this.childNodes.filter(n => n.key === key)[index]?.valueNode ?? null
    }

    query(query: string): JsonNode | null {
        const segments = query.split("/")
        let target: JsonNode | null = this
        while (segments.length && target) {
            const segment = segments.shift()!
            if (target instanceof JsonObjectNode) {
                if (segment.includes(":")) {
                    const [key, index] = segment.split(":")
                    target = target.find(key, parseInt(index))
                } else if (segment && segment !== ".") {
                    target = target.find(segment)
                }
            } else if (target instanceof JsonArrayNode) {
                const index = parseInt(segment)
                target = target.find(index)
            } else {
                target = null
            }
        }
        return target
    }
}

export class JsonModel {
    root: JsonObjectNode

    constructor(readonly text: string) {
        let i = 0
    
        const is = (char: string) => text.substring(i, i + char.length) === char
        const isAny = (...chars: string[]) => chars.some(c => text.substring(i, i + c.length) === c)
        const isWhitespace = () => isAny(" ", "\t", "\r", "\n")
        const isDigit = () => isAny("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")

        const ensure = (char: string) => {
            if (is(char)) {
                return true
            }
            throw new Error(`Unparseable JSON at ${JSON.stringify(text.substring(i - 20, i))}`)
        }

        const skip = (char: string) => {
            ensure(char)
            i += char.length
        }
    
        const skipWhitespace = () => {
            while (isWhitespace()) {
                i++
            }
        }

        const parseNode = (): JsonNode => {
            const start = i
            if (is("{")) {
                skip("{")
                skipWhitespace()
                const childNodes: JsonKeyValueNode[] = []
                while (!is("}")) {
                    const keyNode = parseNode()
                    skipWhitespace()
                    let valueNode: JsonNode | null = null
                    if (is(":")) {
                        skip(":")
                        skipWhitespace()
                        valueNode = parseNode()
                    }
                    childNodes.push(new JsonKeyValueNode(keyNode, valueNode))
                    skipWhitespace()
                    if (is(",")) {
                        skip(",")
                    }
                    skipWhitespace()
                }
                skip("}")
                const end = i
                return new JsonObjectNode(new JsonToken(this, start, end), childNodes)
            } else if (is("[")) {
                skip("[")
                skipWhitespace()
                const childNodes: JsonNode[] = []
                while (!is("]")) {
                    childNodes.push(parseNode())
                    skipWhitespace()
                    if (is(",")) {
                        skip(",")
                    }
                    skipWhitespace()
                }
                skip("]")
                const end = i
                return new JsonArrayNode(new JsonToken(this, start, end), childNodes)
            } else if (is("\"")) {
                skip("\"")
                while (!is("\"")) {
                    if (is("\\\"")) {
                        i++
                    }
                    i++
                }
                skip("\"")
                const end = i
                return new JsonPrimitiveNode(new JsonToken(this, start, end))
            } else if (isDigit() || is("-")) {
                if (is("-")) {
                    skip("-")
                }
                while (isDigit()) {
                    i++
                }
                if (is(".")) {
                    skip(".")
                }
                while (isDigit()) {
                    i++
                }
                if (isAny("e", "E")) {
                    i++
                }
                if (isAny("+", "-")) {
                    i++
                }
                while (isDigit()) {
                    i++
                }
                const end = i
                return new JsonPrimitiveNode(new JsonToken(this, start, end))
            } else if (is("true")) {
                skip("true")
                const end = i
                return new JsonPrimitiveNode(new JsonToken(this, start, end))
            } else if (is("false")) {
                skip("false")
                const end = i
                return new JsonPrimitiveNode(new JsonToken(this, start, end))
            } else if (is("null")) {
                skip("null")
                const end = i
                return new JsonPrimitiveNode(new JsonToken(this, start, end))                
            } else if (is("/*")) {
                skip("/*")
                while (!is("*/")) {
                    i++
                }
                skip("*/")
                skipWhitespace()
                return parseNode()
            } else if (is("//")) {
                skip("//")
                while (!isAny("\r", "\n")) {
                    i++
                }
                skipWhitespace()
                return parseNode()
            }
            throw new Error(`Unparseable JSON at ${JSON.stringify(text.substring(i - 20, i))}`)
        }

        skipWhitespace()
        const root = parseNode()
        if (!(root instanceof JsonObjectNode)) {
            throw new Error("JSON file did not start with a parseable JSON object")
        }
        this.root = root
    }
}
