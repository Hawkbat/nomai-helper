import { jsonToXml, XmlDefinitionBuilder, XmlDefinitionToJson } from "./xml"

const XML_NAMESPACE_KEY = "xmlns:xsi"
const XML_NAMESPACE_VALUE = "http://www.w3.org/2001/XMLSchema-instance"
const XML_SCHEMA_KEY = "xsi:noNamespaceSchemaLocation"
const XML_SCHEMA_DIALOGUE_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/dialogue_schema.xsd"
const XML_SCHEMA_SHIP_LOG_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/shiplog_schema.xsd"
const XML_SCHEMA_TEXT_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/text_schema.xsd"
const JSON_SCHEMA_MANIFEST_URL = "https://raw.githubusercontent.com/ow-mods/owml/master/schemas/manifest_schema.json"
const JSON_SCHEMA_ADDON_MANIFEST_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/addon_manifest_schema.json"
const JSON_SCHEMA_PLANET_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/body_schema.json"
const JSON_SCHEMA_SYSTEM_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/star_system_schema.json"
const JSON_SCHEMA_TRANSLATION_URL = "https://raw.githubusercontent.com/Outer-Wilds-New-Horizons/new-horizons/main/NewHorizons/Schemas/translation_schema.json"

export const dialogueXmlDefinition = new XmlDefinitionBuilder("DialogueTree")
    .string("NameField", true)
    .objectArray("DialogueNode", d => d
        .string("Name", true)
        .boolean("Randomize")
        .objectArray("Dialogue", d => d
            .stringArray("Page", true)
            .string("RequiredCondition")
        , true)
        .string("DialogueTarget")
        .stringArray("EntryCondition")
        .stringArray("DialogueTargetShipLogCondition")
        .stringArray("SetCondition")
        .string("SetPersistentCondition")
        .string("DisablePersistentCondition")
        .object("RevealFacts", d => d
            .stringArray("FactID")
        )
        .object("DialogueOptionsList", d => d
            .objectArray("DialogueOption", d => d
                .string("Text", true)
                .string("DialogueTarget")
                .string("RequiredCondition")
                .stringArray("RequiredPersistentCondition")
                .string("CancelledCondition")
                .stringArray("CancelledPersistentCondition")
                .stringArray("RequiredLogCondition")
                .string("ConditionToSet")
                .string("ConditionToCancel")
            )
            .string("ReuseDialogueOptionsListFrom")
        )
    , true)
    .build()

export type DialogueXmlData = XmlDefinitionToJson<typeof dialogueXmlDefinition>

export type DialogueNodeXmlData = Exclude<DialogueXmlData["DialogueNode"], undefined>[number]

export type DialogueOptionXmlData = Exclude<Exclude<Exclude<DialogueXmlData["DialogueNode"], undefined>[number]["DialogueOptionsList"], undefined>["DialogueOption"], undefined>[number]

export const textXmlDefinition = new XmlDefinitionBuilder("NomaiObject")
    .objectArray("TextBlock", d => d
        .number("ID", true)
        .string("Text", true)
        .number("ParentID")
        .boolean("LocationA")
        .boolean("LocationB")
        .boolean("DefaultFontOverride")
    , true)
    .objectArray("ShipLogConditions", d => d
        .boolean("LocationA")
        .boolean("LocationB")
        .objectArray("RevealFact", d => d
            .string("FactID", true)
            .stringArray("Condition")
        )
    )
    .build()

export type TextXmlData = XmlDefinitionToJson<typeof textXmlDefinition>

export type TextNodeXmlData = Exclude<TextXmlData["TextBlock"], undefined>[number]

export const shipLogEntryXmlDefinitionBuilder = new XmlDefinitionBuilder("Entry")
    .string("ID", true)
    .string("Name", true)
    .boolean("IgnoreMoreToExplore")
    .boolean("ParentIgnoreNotRevealed")
    .boolean("IsCuriosity")
    .string("IgnoreMoreToExploreCondition")
    .string("AltPhotoCondition")
    .string("Curiosity")
    .objectArray("RumorFact", d => d
        .string("ID", true)
        .string("Text", true)
        .object("AltText", d => d
            .string("Text", true)
            .stringArray("Condition", true)
        )
        .string("SourceID")
        .string("RumorName")
        .number("RumorNamePriority")
        .boolean("IgnoreMoreToExplore")
    )
    .objectArray("ExploreFact", d => d
        .string("ID", true)
        .string("Text", true)
        .object("AltText", d => d
            .string("Text", true)
            .stringArray("Condition", true)
        )
        .boolean("IgnoreMoreToExplore")
    )

export const shipLogXmlDefinition = new XmlDefinitionBuilder("AstroObjectEntry")
    .string("ID", true)
    // Recursion hack
    .objectArray("Entry", () => shipLogEntryXmlDefinitionBuilder
        .objectArray("Entry", () => shipLogEntryXmlDefinitionBuilder)
    )
    .build()

export type ShipLogXmlData = XmlDefinitionToJson<typeof shipLogXmlDefinition>

export type ShipLogEntryXmlData = Exclude<ShipLogXmlData["Entry"], undefined>[number]

export type ShipLogRumorFactXmlData = Exclude<Exclude<ShipLogXmlData["Entry"], undefined>[number]["RumorFact"], undefined>[number]

export type ShipLogExploreFactXmlData = Exclude<Exclude<ShipLogXmlData["Entry"], undefined>[number]["ExploreFact"], undefined>[number]

export interface ManifestJsonData {
    filename?: string
    patcher?: string
    author?: string
    name?: string
    uniqueName?: string
    version?: string
    owmlVersion?: string
    dependencies?: string[]
    priorityLoad?: boolean
    minGameVersion?: string
    maxGameVersion?: string
    requireLatestVersion?: boolean
    incompatibleVendors?: string[]
    pathsToPreserve?: string[]
    conflicts?: string[]
    warning?: {
        title?: string
        body?: string
    }
    donateLink?: string
    donateLinks?: string[]
}

export interface AddonManifestJsonData {
    achievements?: {
        ID?: string
        secret?: boolean
        factIDs?: string[]
        signalIDs?: string[]
        conditionIDs?: string[]
    }[]
    credits?: string[]
    popupMessage?: string
    repeatPopup?: boolean
    preloadAssetBundles?: string[]
    subtitlePath?: string
}

export interface PlanetJsonData {
    name?: string
    starSystem?: string
    destroy?: boolean
    Base?: {
        centerOfSolarSystem?: boolean
    }
    Orbit?: {
        primaryBody?: string
        semiMajorAxis?: number
    }
    ShipLog?: {
        mapMode?: {
            details?: {
                invisibleWhenHidden?: boolean
                outlineSprite?: string
                position?: {
                    x?: number
                    y?: number
                }
                revealedSprite?: string
                rotation?: number
                scale?: {
                    x?: number
                    y?: number
                }
            }[]
            invisibleWhenHidden?: boolean
            manualNavigationPosition?: {
                x?: number
                y?: number
            }
            manualPosition?: {
                x?: number
                y?: number
            }
            offset?: number
            outlineSprite?: string
            remove?: boolean
            revealedSprite?: string
            scale?: number
        }
        spriteFolder?: string
        xmlFile?: string
    }
}

export interface StarSystemJsonData {
    name?: string
    destroyStockPlanets?: boolean
    entryPositions?: {
        id?: string
        position?: {
            x?: number
            y?: number
        }
    }[]
    initialReveal?: string[]
    curiosities?: {
        id?: string
        color?: {
            r?: number
            g?: number
            b?: number
            a?: number
        }
        highlightColor?: {
            r?: number
            g?: number
            b?: number
            a?: number
        }
    }[]
}

export interface TranslationJsonData {
    DialogueDictionary?: Record<string, string | undefined>
    ShipLogDictionary?: Record<string, string | undefined>
    UIDictionary?: Record<string, string | undefined>
    OtherDictionary?: Record<string, string | undefined>
    AchievementTranslations?: Record<string, string | undefined>
}

export function serializeShipLogXml(json: ShipLogXmlData) {
    const xml = jsonToXml(shipLogXmlDefinition, json)
    if (xml && !Array.isArray(xml)) {
        xml.attributes[XML_NAMESPACE_KEY] = XML_NAMESPACE_VALUE
        xml.attributes[XML_SCHEMA_KEY] = XML_SCHEMA_SHIP_LOG_URL
    }
    return xml?.toString()
}

export function serializeDialogueXml(json: DialogueXmlData) {
    const xml = jsonToXml(dialogueXmlDefinition, json)
    if (xml && !Array.isArray(xml)) {
        xml.attributes[XML_NAMESPACE_KEY] = XML_NAMESPACE_VALUE
        xml.attributes[XML_SCHEMA_KEY] = XML_SCHEMA_DIALOGUE_URL
    }
    return xml?.toString()
}

export function serializeTextXml(json: TextXmlData) {
    const xml = jsonToXml(textXmlDefinition, json)
    if (xml && !Array.isArray(xml)) {
        xml.attributes[XML_NAMESPACE_KEY] = XML_NAMESPACE_VALUE
        xml.attributes[XML_SCHEMA_KEY] = XML_SCHEMA_TEXT_URL
    }
    return xml?.toString()
}

export function serializeManifestJson(json: ManifestJsonData) {
    return JSON.stringify({ $schema: JSON_SCHEMA_MANIFEST_URL, ...json }, undefined, "\t")
}

export function serializeAddonManifestJson(json: AddonManifestJsonData) {
    return JSON.stringify({ $schema: JSON_SCHEMA_ADDON_MANIFEST_URL, ...json }, undefined, "\t")
}

export function serializeStarSystemJson(json: StarSystemJsonData) {
    return JSON.stringify({ $schema: JSON_SCHEMA_SYSTEM_URL, ...json }, undefined, "\t")
}

export function serializePlanetJson(json: PlanetJsonData) {
    return JSON.stringify({ $schema: JSON_SCHEMA_PLANET_URL, ...json }, undefined, "\t")
}

export function serializeTranslationJson(json: TranslationJsonData) {
    return JSON.stringify({ $schema: JSON_SCHEMA_TRANSLATION_URL, ...json }, undefined, "\t")
}
