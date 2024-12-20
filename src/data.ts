
export interface BaseGameEntryData {
    id: string
    name: string
    facts: {
        explore: {
            id: string
            text: string
        }[]
        rumor: {
            id: string
            text: string
            sourceID?: string
        }[]
    }
    astroObject: string
    position: [x: number, y: number]
    curiosity?: string
    isCuriosity?: boolean
    parent?: string
}

export interface BaseGameCuriosityColor {
    r: number
    g: number
    b: number
    a: number
}

export interface BaseGameCuriosityColors {
    color: BaseGameCuriosityColor
    highlightColor: BaseGameCuriosityColor
}

export const BASE_GAME_CURIOSITY_COLORS: Record<string, BaseGameCuriosityColors> = {
    TIME_LOOP: {
        color: { r: Math.round(0.7059 * 255), g: Math.round(0.4643 * 255), b: Math.round(0.2907 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(1 * 255), g: Math.round(0.6578 * 255), b: Math.round(0.4118 * 255), a: Math.round(1 * 255) },
    },
    QUANTUM_MOON: {
        color: { r: Math.round(0.3126 * 255), g: Math.round(0.2277 * 255), b: Math.round(0.553 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(0.5652 * 255), g: Math.round(0.4118 * 255), b: Math.round(1 * 255), a: Math.round(1 * 255) },
    },
    COMET_CORE: {
        color: { r: Math.round(0.4986 * 255), g: Math.round(0.503 * 255), b: Math.round(0.4809 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(0.8863 * 255), g: Math.round(0.8941 * 255), b: Math.round(0.8549 * 255), a: Math.round(1 * 255) },
    },
    VESSEL: {
        color: { r: Math.round(0.7059 * 255), g: Math.round(0.2907 * 255), b: Math.round(0.2907 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(1 * 255), g: Math.round(0.4118 * 255), b: Math.round(0.4118 * 255), a: Math.round(1 * 255) },
    },
    SUNKEN_MODULE: {
        color: { r: Math.round(0.2228 * 255), g: Math.round(0.5412 * 255), b: Math.round(0.3664 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(0.4118 * 255), g: Math.round(1 * 255), b: Math.round(0.677 * 255), a: Math.round(1 * 255) },
    },
    INVISIBLE_PLANET: {
        color: { r: Math.round(0.1155 * 255), g: Math.round(0.2925 * 255), b: Math.round(0.582 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(0.1988 * 255), g: Math.round(0.5031 * 255), b: Math.round(1 * 255), a: Math.round(1 * 255) },
    },
    DEFAULT: {
        color: { r: Math.round(0.4986 * 255), g: Math.round(0.503 * 255), b: Math.round(0.4809 * 255), a: Math.round(1 * 255) },
        highlightColor: { r: Math.round(0.8863 * 255), g: Math.round(0.8941 * 255), b: Math.round(0.8549 * 255), a: Math.round(1 * 255) },
    },
}

export const BASE_GAME_ENTRIES: BaseGameEntryData[] = [
    {
        id: "S_SUNSTATION",
        name: "Sun Station",
        facts: {
            explore: [
                {
                    id: "S_SUNSTATION_X1",
                    text: "The Sun Station was designed to make the sun go supernova.",
                },
                {
                    id: "S_SUNSTATION_X2",
                    text: "The Nomai fired the Sun Station but it had no effect on the sun. They concluded that the Sun Station could never cause the sun to go supernova.",
                },
                {
                    id: "S_SUNSTATION_X3",
                    text: "After the failure of the Sun Station, the Nomai took a break to investigate the newly arrived comet.",
                },
                {
                    id: "S_SUNSTATION_X4",
                    text: "According to a Nomai computer, our sun has reached the end of its natural life cycle.",
                },
            ],
            rumor: [
                {
                    id: "S_SUNSTATION_R1",
                    text: "There is a way to safely travel to the Sun Station from Ash Twin.",
                    sourceID: "CT_SUNLESS_CITY",
                },
                {
                    id: "S_SUNSTATION_R2",
                    text: "The Nomai debated building a Sun Station in order to power the Ash Twin Project.",
                    sourceID: "CT_SUNLESS_CITY",
                },
                {
                    id: "S_SUNSTATION_R3",
                    text: "The Nomai built something called the Sun Station, but not everyone supported its construction.",
                    sourceID: "TT_WARP_TOWERS",
                },
            ],
        },
        astroObject: "SUN_STATION",
        position: [-10, 361],
        curiosity: "TIME_LOOP",
    },
    {
        id: "CT_CHERT",
        name: "Chert’s Camp",
        facts: {
            explore: [
                {
                    id: "CT_CHERT_X1",
                    text: "Chert has set up their astronomy gear on the north pole of Ember Twin.",
                },
                {
                    id: "CT_CHERT_X2",
                    text: "Chert has spotted an unusually high number of supernovae recently.",
                },
                {
                    id: "CT_CHERT_X3",
                    text: "All of the stars in the universe are dying, including our sun.",
                },
                {
                    id: "CT_CHERT_X4",
                    text: "The stars are simply dying from old age. Apparently they're much older than we realized.",
                },
                {
                    id: "CT_CHERT_X5",
                    text: "Chert has become catatonic in response to our sun's imminent death.",
                },
            ],
            rumor: [],
        },
        astroObject: "CAVE_TWIN",
        position: [-502, 0],
    },
    {
        id: "CT_QUANTUM_MOON_LOCATOR",
        name: "Quantum Moon Locator",
        facts: {
            explore: [
                {
                    id: "CT_QUANTUM_MOON_LOCATOR_X1",
                    text: "A Nomai device created to track the Quantum Moon's location.",
                },
                {
                    id: "CT_QUANTUM_MOON_LOCATOR_X2",
                    text: "The Nomai hypothesized that the Quantum Moon might be a form of macroscopic quantum mechanics.",
                },
                {
                    id: "CT_QUANTUM_MOON_LOCATOR_X3",
                    text: "The Quantum Moon travels to at least five locations, but sometimes the locator can't tell where the moon is.",
                },
            ],
            rumor: [],
        },
        astroObject: "CAVE_TWIN",
        position: [-301, 988],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "CT_GRAVITY_CANNON",
        name: "Gravity Cannon",
        facts: {
            explore: [
                {
                    id: "CT_GRAVITY_CANNON_X1",
                    text: "A huge cylindrical structure that generates a strong upward gravity field.",
                },
                {
                    id: "CT_GRAVITY_CANNON_X2",
                    text: "I recalled a Nomai shuttle from the Interloper.",
                },
            ],
            rumor: [
                {
                    id: "CT_GRAVITY_CANNON_R1",
                    text: "The Nomai shuttle that's frozen on the Interloper can be called home to the gravity cannon on Ember Twin.",
                    sourceID: "COMET_SHUTTLE",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [1871.9988, -644.99805],
        curiosity: "COMET_CORE",
    },
    {
        id: "CT_ESCAPE_POD",
        name: "Escape Pod 2",
        facts: {
            explore: [
                {
                    id: "CT_ESCAPE_POD_X1",
                    text: "One of three Nomai escape pods that crashed in our solar system.",
                },
                {
                    id: "CT_ESCAPE_POD_X2",
                    text: "All three escape pods were launched from something called the Vessel, which was badly damaged.",
                },
            ],
            rumor: [
                {
                    id: "CT_ESCAPE_POD_R1",
                    text: "One of the three Nomai escape pods landed somewhere on the Hourglass Twins.",
                    sourceID: "BH_MURAL_3",
                },
                {
                    id: "CT_ESCAPE_POD_R2",
                    text: "Chert saw a Nomai shipwreck shooting a beam of light into the sky somewhere on Ember Twin's southern hemisphere.",
                    sourceID: "CT_CHERT",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [-407, -360],
        curiosity: "VESSEL",
    },
    {
        id: "CT_HIGH_ENERGY_LAB",
        name: "High Energy Lab",
        facts: {
            explore: [
                {
                    id: "CT_HIGH_ENERGY_LAB_X1",
                    text: "The Nomai successfully reproduced the temporal anomaly first observed at the White Hole Station (warped objects appear to arrive before they depart).",
                },
                {
                    id: "CT_HIGH_ENERGY_LAB_X2",
                    text: "The Nomai discovered they could increase the negative time interval between arrival and departure by adding energy to the warp cores.",
                },
                {
                    id: "CT_HIGH_ENERGY_LAB_X3",
                    text: "The Nomai wanted to know if a 22-minute negative time interval was possible. They concluded it would require new technology to produce the necessary energy as well an advanced warp core to handle those energies. Ash Twin was proposed as a location for the project.",
                },
            ],
            rumor: [
                {
                    id: "CT_HIGH_ENERGY_LAB_R1",
                    text: "The negative time interval measured at the White Hole Station was further investigated at the High Energy Lab (in the canyon at Ember Twin’s equator).",
                    sourceID: "WHITE_HOLE_STATION",
                },
                {
                    id: "CT_HIGH_ENERGY_LAB_R2",
                    text: "The Ash Twin Project was planned at the High Energy Lab, a building with large solar panels on Ember Twin’s equator.",
                },
                {
                    id: "CT_HIGH_ENERGY_LAB_R3",
                    text: "The High Energy Lab can only be accessed by a path from the Sunless City.",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [503, 671],
        curiosity: "TIME_LOOP",
    },
    {
        id: "CT_WARP_TOWER_MAP",
        name: "Ash Twin Tower Designs",
        facts: {
            explore: [
                {
                    id: "CT_WARP_TOWER_MAP_X1",
                    text: "Designs for each of the towers on Ash Twin's equator.",
                },
                {
                    id: "CT_WARP_TOWER_MAP_X4",
                    text: "Each tower warps to a different planet (although many Nomai were quick to note that the sun is not actually a planet).",
                },
                {
                    id: "CT_WARP_TOWER_MAP_X3",
                    text: "Each tower was designed to visually reflect its warp destination.",
                },
                {
                    id: "CT_WARP_TOWER_MAP_X2",
                    text: "The towers allowed the Nomai to quickly travel between Ash Twin and all other locations crucial to the Ash Twin Project.",
                },
            ],
            rumor: [
                {
                    id: "CT_WARP_TOWER_MAP_R1",
                    text: "There are tower designs in the High Energy Lab that reveal each warp receiver's location.",
                    sourceID: "BH_BLACK_HOLE_FORGE",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [442, 585],
        curiosity: "TIME_LOOP",
        parent: "CT_HIGH_ENERGY_LAB",
    },
    {
        id: "CT_SUNLESS_CITY",
        name: "The Sunless City",
        facts: {
            explore: [
                {
                    id: "CT_SUNLESS_CITY_X1",
                    text: "A Nomai city built into the walls of a huge underground cavern. The city is divided vertically into four districts.",
                },
                {
                    id: "CT_SUNLESS_CITY_X2",
                    text: "The Nomai debated building a Sun Station in order to power the Ash Twin Project. Several Nomai opposed its construction, arguing that failure could result in the destruction of the solar system.",
                },
                {
                    id: "CT_SUNLESS_CITY_X3",
                    text: "The Nomai traveled to this solar system in pursuit of a signal from something older than the universe itself. They named the source of this signal the \"Eye of the universe.\"",
                },
            ],
            rumor: [
                {
                    id: "CT_SUNLESS_CITY_R1",
                    text: "The Nomai survivors who crashed on Ember Twin decided to seek shelter in the caves beneath their crashed escape pod.",
                    sourceID: "CT_ESCAPE_POD",
                },
                {
                    id: "CT_SUNLESS_CITY_R3",
                    text: "The Nomai discovered a promising long-term shelter site at the end of one of the passages beneath the escape pod.",
                    sourceID: "CT_ESCAPE_POD",
                },
                {
                    id: "CT_SUNLESS_CITY_R4",
                    text: "Chert thinks the lack of surface ruins means the Nomai must have lived somewhere underground.",
                    sourceID: "CT_CHERT",
                },
                {
                    id: "CT_SUNLESS_CITY_R5",
                    text: "There is a path leading to the High Energy Lab from the Sunless City.",
                },
                {
                    id: "CT_SUNLESS_CITY_R2",
                    text: "I found a trailmarker for the the Sunless City, but the path is blocked.",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [-159, 49],
    },
    {
        id: "CT_ANGLERFISH_FOSSIL",
        name: "Anglerfish Fossil",
        facts: {
            explore: [
                {
                    id: "CT_ANGLERFISH_FOSSIL_X1",
                    text: "Nomai children used to play a game here. One player was the anglerfish and wore a blindfold. The rest of the children (the littlefish) lined up against one wall. When the anglerfish said go, the littlefish had to sneak across to the other side.",
                },
                {
                    id: "CT_ANGLERFISH_FOSSIL_X2",
                    text: "The blindfold rule was added because real anglerfish are blind.",
                },
                {
                    id: "CT_ANGLERFISH_FOSSIL_X3",
                    text: "The adult Nomai were delighted to see the children incorporate their research into the game's rules.",
                },
            ],
            rumor: [
                {
                    id: "CT_ANGLERFISH_FOSSIL_R1",
                    text: "I found a cave with an anglerfish fossil inside, but the opening is only big enough for my scout.",
                    sourceID: "CT_ESCAPE_POD",
                },
                {
                    id: "CT_ANGLERFISH_FOSSIL_R2",
                    text: "The Nomai learned how to evade anglerfish (theoretically, at least) by studying an anglerfish fossil they found on Ember Twin.",
                    sourceID: "BH_HANGING_CITY",
                },
                {
                    id: "CT_ANGLERFISH_FOSSIL_R3",
                    text: "Nomai children used to play a game in Fossil Fish Cave. There is a way to enter Fossil Fish Cave from Stepping Stone Cave.",
                    sourceID: "CT_SUNLESS_CITY",
                },
                {
                    id: "CT_ANGLERFISH_FOSSIL_R4",
                    text: "The entrance from Stepping Stone Cave is hard to see unless the anglerfish is fed a light first.",
                    sourceID: "CT_SUNLESS_CITY",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [-26, -250],
        curiosity: "VESSEL",
    },
    {
        id: "CT_QUANTUM_CAVES",
        name: "Quantum Caves",
        facts: {
            explore: [
                {
                    id: "CT_QUANTUM_CAVES_X1",
                    text: "The Nomai noticed a strange wandering rock that appeared in multiple caves on Ember Twin’s northern hemisphere.",
                },
                {
                    id: "CT_QUANTUM_CAVES_X2",
                    text: "I found a strange rock shard that moves when I’m not watching. It emits a signal on the Quantum Fluctuations frequency.",
                },
            ],
            rumor: [
                {
                    id: "CT_QUANTUM_CAVES_R1",
                    text: "The Nomai detected a quantum signal coming from somewhere on the Hourglass Twins.",
                    sourceID: "BH_QUANTUM_SHARD",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [-554, 1043],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "CT_LAKEBED_CAVERN",
        name: "Lakebed Cave",
        facts: {
            explore: [
                {
                    id: "CT_LAKEBED_CAVERN_X1",
                    text: "A Nomai named Coleus was standing on the wandering rock when another Nomai's lantern died. When they relit the lantern, Coleus and the rock were both gone.",
                },
                {
                    id: "CT_LAKEBED_CAVERN_X2",
                    text: "To travel with a quantum object, I must stand on the object and cease to observe my surroundings (meaning I must be in complete darkness). Coleus used this quantum rule to escape the cave he was trapped in.",
                },
                {
                    id: "CT_LAKEBED_CAVERN_X3",
                    text: "Coleus and Merolae returned to examine the rock. They theorized that when a conscious being is in contact with a quantum object and ceases to observe his or her surroundings, the being can become entangled with that quantum object, and they both move together.",
                },
            ],
            rumor: [
                {
                    id: "CT_LAKEBED_CAVERN_R1",
                    text: "The wandering rock was first spotted in a cave at the bottom of the dry lakebed at Ember Twin’s north pole.",
                    sourceID: "CT_QUANTUM_CAVES",
                },
                {
                    id: "CT_LAKEBED_CAVERN_R2",
                    text: "A Nomai named Coleus mysteriously vanished from a cave at the bottom of the dry lakebed at Ember Twin’s north pole.",
                    sourceID: "CT_QUANTUM_CAVES",
                },
            ],
        },
        astroObject: "CAVE_TWIN",
        position: [-666, 761],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "TT_WARP_TOWERS",
        name: "Ash Twin Towers",
        facts: {
            explore: [
                {
                    id: "TT_WARP_TOWERS_X1",
                    text: "Several large Nomai towers form a ring around Ash Twin's equator.",
                },
                {
                    id: "TT_WARP_TOWERS_X2",
                    text: "The White Hole Station was used as a model for these towers, which were built for the Ash Twin Project.",
                },
            ],
            rumor: [],
        },
        astroObject: "TOWER_TWIN",
        position: [248, 359],
        curiosity: "TIME_LOOP",
    },
    {
        id: "TT_TIME_LOOP_DEVICE",
        name: "Ash Twin Project",
        facts: {
            explore: [
                {
                    id: "TT_TIME_LOOP_DEVICE_X1",
                    text: "A hollowed-out chamber inside Ash Twin. The energy cables from the surface are plugged into a protective casing at the center of the planet.",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_X2",
                    text: "There are eight monoliths with Nomai masks attached. Three of the masks are actively receiving data from the Probe Tracking Module, Giant's Deep, and Timber Hearth respectively.",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_X3",
                    text: "The Ash Twin Project was designed to use the energy from a supernova (triggered by the Sun Station) to send probe data from the Orbital Probe Cannon 22 minutes into the past.",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_X4",
                    text: "The Sun Station did not work. Although the Ash Twin Project was theoretically sound, the Nomai were unable to power it.",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_X5",
                    text: "There is an advanced warp core inside the protective casing at the center of the planet. Removing the core will disable the Ash Twin Project.",
                },
            ],
            rumor: [
                {
                    id: "TT_TIME_LOOP_DEVICE_R1",
                    text: "The central chamber inside Ash Twin was physically sealed off by an immensely thick protective shell.",
                    sourceID: "TH_NOMAI_MINE",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_R2",
                    text: "The Nomai planned to construct technology capable of producing a 22-minute negative time interval on Ash Twin.",
                    sourceID: "CT_HIGH_ENERGY_LAB",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_R3",
                    text: "Every memory recorded by a Nomai statue is transmitted to a corresponding storage unit within Ash Twin.",
                    sourceID: "GD_STATUE_WORKSHOP",
                },
                {
                    id: "TT_TIME_LOOP_DEVICE_R4",
                    text: "An advanced warp core was approved for installation in the central chamber of Ash Twin.",
                    sourceID: "BH_BLACK_HOLE_FORGE",
                },
            ],
        },
        astroObject: "TOWER_TWIN",
        position: [645, 282],
        curiosity: "TIME_LOOP",
        isCuriosity: true,
    },
    {
        id: "TH_VILLAGE",
        name: "Village",
        facts: {
            explore: [
                {
                    id: "TH_VILLAGE_X1",
                    text: "The one and only Hearthian village, as well as the main source of explosions on this planet.",
                },
                {
                    id: "TH_VILLAGE_X2",
                    text: "The Nomai statue in the observatory opened its eyes and looked at me! I saw strange glowing lights and my own memories flashed before my eyes.",
                },
                {
                    id: "TH_VILLAGE_X3",
                    text: "Hal says the statue has never opened its eyes before (despite Hornfels' best efforts).",
                },
            ],
            rumor: [],
        },
        astroObject: "TIMBER_HEARTH",
        position: [1479, 908],
    },
    {
        id: "TH_ZERO_G_CAVE",
        name: "Zero-G Cave",
        facts: {
            explore: [
                {
                    id: "TH_ZERO_G_CAVE_X1",
                    text: "A cave at the very center of Timber Hearth used by Outer Wilds Ventures to train new astronauts.",
                },
                {
                    id: "TH_ZERO_G_CAVE_X2",
                    text: "I successfully repaired another \"satellite\" for Gossan.",
                },
            ],
            rumor: [
                {
                    id: "TH_ZERO_G_CAVE_R1",
                    text: "I hear Gossan has the zero-g cave set up if I want a refresher before I launch.",
                },
            ],
        },
        astroObject: "TIMBER_HEARTH",
        position: [1547.0066, 821.9953],
        parent: "TH_VILLAGE",
    },
    {
        id: "TH_IMPACT_CRATER",
        name: "Dark Bramble Seed",
        facts: {
            explore: [
                {
                    id: "TH_IMPACT_CRATER_X1",
                    text: "A seed from Dark Bramble crashed here and has already taken root. Tektite wants to use a scout launcher to get a look at what's inside.",
                },
                {
                    id: "TH_IMPACT_CRATER_X2",
                    text: "My signalscope picks up harmonica music when I aim it at the seed.",
                },
                {
                    id: "TH_IMPACT_CRATER_X3",
                    text: "I launched my Little Scout into the seed. Somehow the seed is much bigger on the inside.",
                },
            ],
            rumor: [
                {
                    id: "TH_IMPACT_CRATER_R1",
                    text: "Esker's signalscope log reports harmonica music coming from somewhere on Timber Hearth. They claim it sounds just like Feldspar's harmonica, but Feldspar disappeared in space ages ago.",
                    sourceID: "TM_NORTH_POLE",
                },
            ],
        },
        astroObject: "TIMBER_HEARTH",
        position: [2701, 1159],
    },
    {
        id: "TH_NOMAI_MINE",
        name: "Nomai Mines",
        facts: {
            explore: [
                {
                    id: "TH_NOMAI_MINE_X1",
                    text: "The Nomai mined ore from this site to craft a protective shell designed to physically seal off the central chamber inside Ash Twin.",
                },
                {
                    id: "TH_NOMAI_MINE_X2",
                    text: "Once the shell was finished, the Nomai checked to ensure there were no longer any physical entrances or cracks.",
                },
                {
                    id: "TH_NOMAI_MINE_X3",
                    text: "The Nomai discovered a species of four-eyed, semi-aquatic lifeforms in the waterways near the mine.",
                },
            ],
            rumor: [
                {
                    id: "TH_NOMAI_MINE_R1",
                    text: "The Nomai were mining ore somewhere on Timber Hearth.",
                    sourceID: "VM_VOLCANO",
                },
            ],
        },
        astroObject: "TIMBER_HEARTH",
        position: [911, 5],
        curiosity: "TIME_LOOP",
    },
    {
        id: "TH_QUANTUM_SHARD",
        name: "Quantum Grove",
        facts: {
            explore: [
                {
                    id: "TH_QUANTUM_SHARD_X1",
                    text: "There is a strange rock shard in this grove that moves when I’m not watching. It emits a signal on the Quantum Fluctuations frequency.",
                },
                {
                    id: "TH_QUANTUM_SHARD_X2",
                    text: "I found a poem written on one of the trees in the grove.",
                },
            ],
            rumor: [
                {
                    id: "TH_QUANTUM_SHARD_R1",
                    text: "Chert detected a strange signal coming from the crater at Timber Hearth's south pole. It's very similar to the signal emitted by the Quantum Moon.",
                },
                {
                    id: "TH_QUANTUM_SHARD_R2",
                    text: "The Nomai detected a quantum signal coming from somewhere on Timber Hearth.",
                    sourceID: "BH_QUANTUM_SHARD",
                },
            ],
        },
        astroObject: "TIMBER_HEARTH",
        position: [-878, 1087],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "TH_RADIO_TOWER",
        name: "Radio Tower",
        facts: {
            explore: [
                {
                    id: "TH_RADIO_TOWER_X1",
                    text: "A radio tower designed to receive photos taken by the deep space satellite. There are several photos of the entire solar system hanging on the walls. Hornfels noticed something strange in one of the photos, but concluded equipment malfunction was the only sensible explanation.",
                },
            ],
            rumor: [],
        },
        astroObject: "TIMBER_HEARTH",
        position: [2275, -266],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "TM_ESKER",
        name: "Esker’s Camp",
        facts: {
            explore: [
                {
                    id: "TM_ESKER_X1",
                    text: "Esker is growing a crop of trees at their camp. They seemed to be doing ok, but they’ve probably been alone on the moon for too long.",
                },
            ],
            rumor: [
                {
                    id: "TM_ESKER_R1",
                    text: "Sounds like Esker is still stationed on the Attlerock. They’ve been there by themself for a while.",
                    sourceID: "TH_VILLAGE",
                },
            ],
        },
        astroObject: "TIMBER_MOON",
        position: [1716, 1222],
    },
    {
        id: "TM_NORTH_POLE",
        name: "Lunar Lookout",
        facts: {
            explore: [
                {
                    id: "TM_NORTH_POLE_X1",
                    text: "A lookout platform with a spectacular view of the solar system. Esker uses their signalscope here to keep tabs on the other travelers.",
                },
            ],
            rumor: [
                {
                    id: "TM_NORTH_POLE_R1",
                    text: "Esker says the Attlerock’s north pole (marked in red on my minimap) is a great spot to listen for the other travelers’ music with a signalscope.",
                    sourceID: "TM_ESKER",
                },
            ],
        },
        astroObject: "TIMBER_MOON",
        position: [2164, 1353],
    },
    {
        id: "TM_EYE_LOCATOR",
        name: "Eye Signal Locator",
        facts: {
            explore: [
                {
                    id: "TM_EYE_LOCATOR_X1",
                    text: "A Nomai device created to pinpoint the sources of distant signals.",
                },
                {
                    id: "TM_EYE_LOCATOR_X2",
                    text: "The Nomai were disappointed by their failure to detect a signal from something called the Eye of the universe.",
                },
            ],
            rumor: [
                {
                    id: "TM_EYE_LOCATOR_R1",
                    text: "I hear there are Nomai ruins somewhere on the Attlerock. No one knows what they are or why they were built.",
                    sourceID: "TH_VILLAGE",
                },
                {
                    id: "TM_EYE_LOCATOR_R2",
                    text: "The Nomai text in the observatory talks about calibrating some sort of device on the Attlerock.",
                    sourceID: "TH_VILLAGE",
                },
            ],
        },
        astroObject: "TIMBER_MOON",
        position: [1957, 1010],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "BH_RIEBECK",
        name: "Riebeck’s Camp",
        facts: {
            explore: [
                {
                    id: "BH_RIEBECK_X1",
                    text: "Riebeck has set up camp at the bottom of the Crossroads. Their excitement at being surrounded by so much Nomai history is matched only by their terror of the black hole.",
                },
                {
                    id: "BH_RIEBECK_X2",
                    text: "Riebeck is Timber Hearth's only archaeologist. They overcame their fear of space to explore Brittle Hollow's treasure trove of Nomai culture.",
                },
            ],
            rumor: [
                {
                    id: "BH_RIEBECK_R1",
                    text: "Riebeck headed to Brittle Hollow to investigate something the Nomai were doing at the south pole.",
                    sourceID: "TM_EYE_LOCATOR",
                },
                {
                    id: "BH_RIEBECK_R2",
                    text: "Riebeck landed their ship near the big dome at the south pole. The door leading inside was broken, so they decided to head north to the ruins on the equator in search of a way beneath the surface.",
                },
                {
                    id: "BH_RIEBECK_R3",
                    text: "Riebeck discovered an old Nomai path near their campsite on the equator. The path starts inside the ruined building with trees growing out of it.",
                },
                {
                    id: "BH_RIEBECK_R4",
                    text: "Riebeck reached the Crossroads and continued downward in search of oxygen.",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [2241, 1104],
    },
    {
        id: "BH_GRAVITY_CANNON",
        name: "Gravity Cannon",
        facts: {
            explore: [
                {
                    id: "BH_GRAVITY_CANNON_X1",
                    text: "A huge cylindrical structure that generates a strong upward gravity field.",
                },
                {
                    id: "BH_GRAVITY_CANNON_X2",
                    text: "I recalled a Nomai shuttle from the Quantum Moon.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-483, 1707],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "BH_QUANTUM_RESEARCH_TOWER",
        name: "Tower of Quantum Knowledge",
        facts: {
            explore: [
                {
                    id: "BH_QUANTUM_RESEARCH_TOWER_X1",
                    text: "The Nomai built a shrine on the Quantum Moon to aid in the pilgrimage to its sixth location. \"Remember this final rule: To explore the sixth location, the shrine must be on the moon’s north pole.\"",
                },
                {
                    id: "BH_QUANTUM_RESEARCH_TOWER_X2",
                    text: "The pilgrimage to the Quantum Moon was a deeply significant journey for the Nomai.",
                },
                {
                    id: "BH_QUANTUM_RESEARCH_TOWER_X3",
                    text: "After the two groups of Nomai stranded on Ember Twin and Brittle Hollow were reunited, it became their united goal to find and visit the Quantum Moon.",
                },
            ],
            rumor: [
                {
                    id: "BH_QUANTUM_RESEARCH_TOWER_R1",
                    text: "This tower (located on Brittle Hollow's equator) held useful knowledge for Nomai embarking on their first pilgrimage to the Quantum Moon.",
                },
                {
                    id: "BH_QUANTUM_RESEARCH_TOWER_R2",
                    text: "A Nomai named Solanum was told to visit the Tower of Quantum Knowledge (on Brittle Hollow's equator) to learn one final rule before embarking on her pilgrimage to the Quantum Moon.",
                    sourceID: "BH_GRAVITY_CANNON",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-601, 1375],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "BH_QUANTUM_SHARD",
        name: "Quantum Shard",
        facts: {
            explore: [
                {
                    id: "BH_QUANTUM_SHARD_X1",
                    text: "A strange rock shard that wanders when no one is watching. The Nomai determined this shard is the reason objects in this grove behave in a quantum manner.",
                },
                {
                    id: "BH_QUANTUM_SHARD_X2",
                    text: "The Nomai hypothesized that this shard is actually a piece of the Quantum Moon.",
                },
                {
                    id: "BH_QUANTUM_SHARD_X3",
                    text: "This shard emits the same signal as the Quantum Moon.",
                },
            ],
            rumor: [
                {
                    id: "BH_QUANTUM_SHARD_R1",
                    text: "The Nomai noticed a strange rock shard that appeared to wander when no one was watching.",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-667.9691, 1288.1255],
        curiosity: "QUANTUM_MOON",
        parent: "BH_QUANTUM_RESEARCH_TOWER",
    },
    {
        id: "BH_WARP_RECEIVER",
        name: "Northern Glacier",
        facts: {
            explore: [
                {
                    id: "BH_WARP_RECEIVER_X1",
                    text: "The north pole of Brittle Hollow is covered in snow and ice. There is a uniquely shaped Nomai ruin on the surface.",
                },
                {
                    id: "BH_WARP_RECEIVER_X2",
                    text: "The Nomai were able to warp here from the White Hole Station. This is where they first recreated warp technology.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [123, 1026],
    },
    {
        id: "BH_ESCAPE_POD",
        name: "Escape Pod 1",
        facts: {
            explore: [
                {
                    id: "BH_ESCAPE_POD_X1",
                    text: "One of three Nomai escape pods that crashed in our solar system.",
                },
                {
                    id: "BH_ESCAPE_POD_X2",
                    text: "All three escape pods were launched from something called the Vessel, which was badly damaged.",
                },
            ],
            rumor: [
                {
                    id: "BH_ESCAPE_POD_R1",
                    text: "One of the three Nomai escape pods landed somewhere on Brittle Hollow.",
                    sourceID: "BH_MURAL_3",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [109, -650],
        curiosity: "VESSEL",
    },
    {
        id: "BH_OLD_SETTLEMENT",
        name: "Old Settlement",
        facts: {
            explore: [
                {
                    id: "BH_OLD_SETTLEMENT_X1",
                    text: "The Nomai constructed a temporary settlement beneath their crashed escape pod.",
                },
                {
                    id: "BH_OLD_SETTLEMENT_X2",
                    text: "The Nomai worked together to recall an eye-shaped signal they encountered while aboard the Vessel.",
                },
                {
                    id: "BH_OLD_SETTLEMENT_X3",
                    text: "The signal was somehow older than the universe itself. The Nomai decided to call it the \"Eye of the universe.\"",
                },
                {
                    id: "BH_OLD_SETTLEMENT_X4",
                    text: "The Nomai abandoned this settlement over growing concerns about its stability.",
                },
            ],
            rumor: [
                {
                    id: "BH_OLD_SETTLEMENT_R1",
                    text: "The Nomai survivors who crashed on Brittle Hollow climbed down the cliff to a shelter site below the surface.",
                    sourceID: "BH_ESCAPE_POD",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-106.032265, -466.002],
        curiosity: "VESSEL",
    },
    {
        id: "BH_MURAL_3",
        name: "Mural (Panel 3)",
        facts: {
            explore: [
                {
                    id: "BH_MURAL_3_X1",
                    text: "A mural of three escape pods evacuating the Nomai vessel.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-155.72878, -562.1994],
        curiosity: "VESSEL",
        parent: "BH_OLD_SETTLEMENT",
    },
    {
        id: "BH_MURAL_2",
        name: "Mural (Panel 2)",
        facts: {
            explore: [
                {
                    id: "BH_MURAL_2_X1",
                    text: "A mural of Dark Bramble ensnaring the Nomai vessel.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-234.02878, -562.1994],
        curiosity: "VESSEL",
        parent: "BH_OLD_SETTLEMENT",
    },
    {
        id: "BH_MURAL_1",
        name: "Mural (Panel 1)",
        facts: {
            explore: [
                {
                    id: "BH_MURAL_1_X1",
                    text: "A mural of a Nomai vessel encountering a signal.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [-314.4257, -562.1994],
        curiosity: "VESSEL",
        parent: "BH_OLD_SETTLEMENT",
    },
    {
        id: "BH_HANGING_CITY",
        name: "The Hanging City",
        facts: {
            explore: [
                {
                    id: "BH_HANGING_CITY_X1",
                    text: "A Nomai city suspended beneath Brittle Hollow's northern glacier. The city is divided vertically into four districts.",
                },
                {
                    id: "BH_HANGING_CITY_X2",
                    text: "I found a switch in the Meltwater District that raises and lowers the Black Hole Forge.",
                },
                {
                    id: "BH_HANGING_CITY_X3",
                    text: "The Nomai debated how to obtain the powerful, highly advanced warp core required for the Ash Twin Project.",
                },
                {
                    id: "BH_HANGING_CITY_X4",
                    text: "The Nomai traveled to this solar system in pursuit of a signal from something older than the universe itself. They named the source of this signal the \"Eye of the universe.\"",
                },
            ],
            rumor: [
                {
                    id: "BH_HANGING_CITY_R1",
                    text: "The Nomai decided to migrate from the Old Settlement to the northern glacier. They used gravity crystals to craft a stable path beneath the surface.",
                    sourceID: "BH_OLD_SETTLEMENT",
                },
                {
                    id: "BH_HANGING_CITY_R2",
                    text: "There's a huge Nomai city just to the north of Riebeck's campsite.",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [378, -466],
    },
    {
        id: "BH_BLACK_HOLE_FORGE",
        name: "Black Hole Forge",
        facts: {
            explore: [
                {
                    id: "BH_BLACK_HOLE_FORGE_X4",
                    text: "A warp tower's alignment point is not its warp receiver. Rather, a warp tower always aligns with the center of its corresponding astral body.",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_X5",
                    text: "The warp receiver must be located on (or in close orbit around) the relevant astral body.",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_X6",
                    text: "The Hourglass Twins are so close together they function as a single astral body, with a shared alignment point in between them.",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_X1",
                    text: "All of the warp towers were being constructed on Ash Twin, while the six warp receivers were being constructed at different locations.",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_X3",
                    text: "A Nomai named Poke successfully forged an advanced warp core for the Ash Twin Project.",
                },
            ],
            rumor: [
                {
                    id: "BH_BLACK_HOLE_FORGE_R1",
                    text: "The Black Hole Forge is suspended below the Hanging City. I found a switch in the Meltwater District that raises and lowers the forge.",
                    sourceID: "BH_HANGING_CITY",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_R2",
                    text: "The Black Hole Forge District is the highest district in the Hanging City.",
                    sourceID: "BH_HANGING_CITY",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_R3",
                    text: "A Nomai named Poke planned to create a new advanced warp core in the Black Hole Forge.",
                    sourceID: "BH_HANGING_CITY",
                },
                {
                    id: "BH_BLACK_HOLE_FORGE_R4",
                    text: "The Nomai crafted warp cores at the Black Hole Forge before delivering them to Ash Twin.",
                    sourceID: "TT_WARP_TOWERS",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [381, 8],
        curiosity: "TIME_LOOP",
    },
    {
        id: "BH_WARP_ALIGNMENT_MAP",
        name: "Alignment Angle Diagram",
        facts: {
            explore: [
                {
                    id: "BH_WARP_ALIGNMENT_MAP_X1",
                    text: "A diagram depicting the alignment angle between a warp tower and its corresponding astral body.",
                },
                {
                    id: "BH_WARP_ALIGNMENT_MAP_X2",
                    text: "Warp tower alignment angles are not exact. They only need to be within five degrees of the astral body's center.",
                },
                {
                    id: "BH_WARP_ALIGNMENT_MAP_X3",
                    text: "This results in slightly longer warp windows that last roughly several seconds.",
                },
                {
                    id: "BH_WARP_ALIGNMENT_MAP_X4",
                    text: "Anyone stepping onto the warp platform during the active window will be immediately warped.",
                },
            ],
            rumor: [],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [454.7, -68.6],
        curiosity: "TIME_LOOP",
        parent: "BH_BLACK_HOLE_FORGE",
    },
    {
        id: "BH_OBSERVATORY",
        name: "Southern Observatory",
        facts: {
            explore: [
                {
                    id: "BH_OBSERVATORY_X1",
                    text: "The new, more sensitive locator the Nomai built in this observatory was unable to detect any trace of the Eye's signal.",
                },
                {
                    id: "BH_OBSERVATORY_X2",
                    text: "Based on their knowledge of the Quantum Moon, the Nomai believed the Eye was in a distant orbit around the sun.",
                },
                {
                    id: "BH_OBSERVATORY_X3",
                    text: "The Nomai decided to stop searching for the Eye's signal and instead look for it visually by sending out a deep space probe.",
                },
                {
                    id: "BH_OBSERVATORY_X4",
                    text: "There were concerns that the probability of launching a probe in the correct direction would be absurdly small.",
                },
            ],
            rumor: [
                {
                    id: "BH_OBSERVATORY_R1",
                    text: "The Nomai decided to build a larger, more sophisticated Eye signal locator on Brittle Hollow's south pole.",
                    sourceID: "TM_EYE_LOCATOR",
                },
                {
                    id: "BH_OBSERVATORY_R2",
                    text: "There are two paths beneath Brittle Hollow's surface that lead to the observatory. One starts at the gravity cannon, and the other starts at the Tower of Quantum Knowledge.",
                    sourceID: "GD_CONSTRUCTION_YARD",
                },
                {
                    id: "BH_OBSERVATORY_R3",
                    text: "Riebeck says you can't get into the observatory from the surface (they tried), but there's probably a path to it beneath the crust somewhere.",
                    sourceID: "BH_RIEBECK",
                },
                {
                    id: "BH_OBSERVATORY_R4",
                    text: "There's a door to the observatory on the surface, but it's broken.",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [2423, 843],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "BH_TORNADO_SIMULATION",
        name: "Tornado Simulation",
        facts: {
            explore: [
                {
                    id: "BH_TORNADO_SIMULATION_X1",
                    text: "Most cyclones on Giant's Deep rotate clockwise. These are the cyclones the Nomai used to send components into orbit.",
                },
                {
                    id: "BH_TORNADO_SIMULATION_X2",
                    text: "There also exists a rarer type of cyclone that spins the opposite direction and pushes objects beneath the waters and below the current.",
                },
            ],
            rumor: [
                {
                    id: "BH_TORNADO_SIMULATION_R1",
                    text: "The Nomai at the Southern Observatory constructed a model of Giant's Deep that revealed how an object might sink below the strong ocean current.",
                    sourceID: "GD_CONSTRUCTION_YARD",
                },
            ],
        },
        astroObject: "BRITTLE_HOLLOW",
        position: [2491.0005, 755.00214],
        curiosity: "SUNKEN_MODULE",
        parent: "BH_OBSERVATORY",
    },
    {
        id: "VM_VOLCANO",
        name: "Volcanic Testing Site",
        facts: {
            explore: [
                {
                    id: "VM_VOLCANO_X1",
                    text: "Ore samples from the Nomai Mines on Timber Hearth were sent to this volcano for durability testing.",
                },
                {
                    id: "VM_VOLCANO_X2",
                    text: "The Nomai were trying to craft a (briefly) supernova-proof shell to encase the Ash Twin Project.",
                },
                {
                    id: "VM_VOLCANO_X3",
                    text: "Even the smallest crack or opening in the protective shell would destroy everything.",
                },
            ],
            rumor: [],
        },
        astroObject: "VOLCANIC_MOON",
        position: [1135, 4],
        curiosity: "TIME_LOOP",
    },
    {
        id: "GD_OCEAN",
        name: "Ocean Depths",
        facts: {
            explore: [
                {
                    id: "GD_OCEAN_X1",
                    text: "The ocean is surprisingly calm beneath the current. Some sort of electrical field surrounds the planet's core.",
                },
                {
                    id: "GD_OCEAN_X2",
                    text: "I passed through the electric barrier and reached the coral forest at the planet's core.",
                },
            ],
            rumor: [
                {
                    id: "GD_OCEAN_R1",
                    text: "Gabbro says there’s a strong current beneath the surface of the ocean that prevents anything from sinking below it.",
                    sourceID: "GD_GABBRO_ISLAND",
                },
                {
                    id: "GD_OCEAN_R2",
                    text: "The Nomai on the Construction Yard saw something sink beneath the underwater current, which they'd previously thought was impossible.",
                    sourceID: "GD_CONSTRUCTION_YARD",
                },
                {
                    id: "GD_OCEAN_R3",
                    text: "Feldspar found a way to reach the core of Giant’s Deep.",
                    sourceID: "GD_BRAMBLE_ISLAND",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [1967, 161],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "GD_GABBRO_ISLAND",
        name: "Gabbro’s Island",
        facts: {
            explore: [
                {
                    id: "GD_GABBRO_ISLAND_X0",
                    text: "Gabbro is lounging in a hammock near the island’s shore.",
                },
                {
                    id: "GD_GABBRO_ISLAND_X1",
                    text: "Gabbro found a Nomai statue on another island. The statue's eyes started glowing and Gabbro saw their memories flash before their eyes.",
                },
                {
                    id: "GD_GABBRO_ISLAND_X2",
                    text: "Gabbro remembers dying. They saw their memories flash before their eyes, just like the time with the statue.",
                },
                {
                    id: "GD_GABBRO_ISLAND_X3",
                    text: "Gabbro and I seem to be the only ones aware that we're in a time loop.",
                },
            ],
            rumor: [
                {
                    id: "GD_GABBRO_ISLAND_R1",
                    text: "Hal says Gabbro went back to Giant’s Deep to try to learn more about the Nomai statue in the observatory.",
                    sourceID: "TH_VILLAGE",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [1377.9973, 562.99536],
    },
    {
        id: "GD_CONSTRUCTION_YARD",
        name: "Construction Yard",
        facts: {
            explore: [
                {
                    id: "GD_CONSTRUCTION_YARD_X1",
                    text: "This island is where the Nomai built the Orbital Probe Cannon.",
                },
                {
                    id: "GD_CONSTRUCTION_YARD_X2",
                    text: "For some reason, the Nomai put the Orbital Probe Cannon on indefinite hiatus. The cannon was not asked to fire.",
                },
                {
                    id: "GD_CONSTRUCTION_YARD_X3",
                    text: "According to a Nomai computer, a long-range probe was recently launched from the Orbital Probe Cannon.",
                },
            ],
            rumor: [
                {
                    id: "GD_CONSTRUCTION_YARD_R1",
                    text: "The Nomai built the Orbital Probe Cannon at a Construction Yard on Giant’s Deep.",
                    sourceID: "ORBITAL_PROBE_CANNON",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [2372, 493],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "GD_BRAMBLE_ISLAND",
        name: "Bramble Island",
        facts: {
            explore: [
                {
                    id: "GD_BRAMBLE_ISLAND_X1",
                    text: "An island of thorny vines and what appears to be a frozen jellyfish. It looks like Feldspar camped here before heading off to Dark Bramble.",
                },
            ],
            rumor: [],
        },
        astroObject: "GIANTS_DEEP",
        position: [2585, 172],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "GD_STATUE_ISLAND",
        name: "Statue Island",
        facts: {
            explore: [
                {
                    id: "GD_STATUE_ISLAND_X1",
                    text: "This island must be where the Nomai created statues like the one in our observatory.",
                },
                {
                    id: "GD_STATUE_ISLAND_X2",
                    text: "I found a Nomai statue lying on the beach. It looks just like the one in our observatory.",
                },
            ],
            rumor: [
                {
                    id: "GD_STATUE_ISLAND_R1",
                    text: "One of the islands on Giant’s Deep has a Nomai statue on the beach just like the one Gabbro brought back to Timber Hearth.",
                    sourceID: "GD_GABBRO_ISLAND",
                },
                {
                    id: "GD_STATUE_ISLAND_R2",
                    text: "Statue Island (as Gabbro calls it) is the one with two islands connected by a natural rock arch.",
                    sourceID: "GD_GABBRO_ISLAND",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [985, 562],
        curiosity: "TIME_LOOP",
    },
    {
        id: "GD_STATUE_WORKSHOP",
        name: "Statue Workshop",
        facts: {
            explore: [
                {
                    id: "GD_STATUE_WORKSHOP_X1",
                    text: "Nomai statues were designed to pair with a single user, record their memories, and send those memories to a storage unit within the Ash Twin Project.",
                },
                {
                    id: "GD_STATUE_WORKSHOP_X2",
                    text: "Each storage unit inside the Ash Twin Project was equipped with a mask (the statue’s counterpart), which could then send those stored memories back to the corresponding user.",
                },
                {
                    id: "GD_STATUE_WORKSHOP_X3",
                    text: "The statues were designed to only activate once the Ash Twin Project succeeded, or in the event that it failed.",
                },
            ],
            rumor: [
                {
                    id: "GD_STATUE_WORKSHOP_R1",
                    text: "I found a sign for a \"Statue Workshop\" next to a broken door that used to lead inside the island.",
                },
                {
                    id: "GD_STATUE_WORKSHOP_R2",
                    text: "Some Nomai children debated bypassing the Statue Workshop's door and sneaking inside via an alternate (more dangerous) route.",
                },
                {
                    id: "GD_STATUE_WORKSHOP_R3",
                    text: "I can see into a large cave from one of the ruins on top of the island. The bottom of the cave is filled with water.",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [915.973, 474.01932],
        curiosity: "TIME_LOOP",
        parent: "GD_STATUE_ISLAND",
    },
    {
        id: "GD_QUANTUM_TOWER",
        name: "Tower of Quantum Trials",
        facts: {
            explore: [
                {
                    id: "GD_QUANTUM_TOWER_X1",
                    text: "This tower held knowledge a Nomai needed to make his or her first quantum journey.",
                },
                {
                    id: "GD_QUANTUM_TOWER_X2",
                    text: "\"Observing a quantum object; observing an image of a quantum object. These are the same.\"",
                },
                {
                    id: "GD_QUANTUM_TOWER_X3",
                    text: "The Nomai called this the \"Rule of Quantum Imaging.\"",
                },
                {
                    id: "GD_QUANTUM_TOWER_X4",
                    text: "\"Remember, the other quantum shards have other lessons to teach.\"",
                },
            ],
            rumor: [
                {
                    id: "GD_QUANTUM_TOWER_R1",
                    text: "The Nomai detected a Quantum signal coming from somewhere on Giant’s Deep.",
                    sourceID: "BH_QUANTUM_SHARD",
                },
            ],
        },
        astroObject: "GIANTS_DEEP",
        position: [-877, 1447],
        curiosity: "QUANTUM_MOON",
    },
    {
        id: "ORBITAL_PROBE_CANNON",
        name: "Orbital Probe Cannon",
        facts: {
            explore: [
                {
                    id: "ORBITAL_PROBE_CANNON_X1",
                    text: "The broken remains of a Nomai space station in orbit around Giant's Deep. There are three accessways branching off from the central hub area.",
                },
                {
                    id: "ORBITAL_PROBE_CANNON_X2",
                    text: "The Orbital Probe Cannon was created to find the precise location of the Eye of the universe.",
                },
                {
                    id: "ORBITAL_PROBE_CANNON_X3",
                    text: "The Nomai pushed the Orbital Probe Cannon above its maximum power setting to create the greatest chance of finding the Eye of the universe.",
                },
            ],
            rumor: [
                {
                    id: "ORBITAL_PROBE_CANNON_R1",
                    text: "The Nomai finished building the final module for the Orbital Probe Cannon and sent it into orbit around Giant’s Deep.",
                    sourceID: "GD_CONSTRUCTION_YARD",
                },
                {
                    id: "ORBITAL_PROBE_CANNON_R2",
                    text: "I used a Nomai projection pool and saw the interior of a space station in orbit around Giant's Deep.",
                    sourceID: "GD_CONSTRUCTION_YARD",
                },
                {
                    id: "ORBITAL_PROBE_CANNON_R4",
                    text: "The Nomai decided to construct a probe cannon in orbit around Giant’s Deep.",
                    sourceID: "BH_OBSERVATORY",
                },
                {
                    id: "ORBITAL_PROBE_CANNON_R3",
                    text: "Gabbro sees a bright flash in the sky at the start of every loop. Something must be happening in orbit around Giant’s Deep.",
                    sourceID: "GD_GABBRO_ISLAND",
                },
            ],
        },
        astroObject: "ORBITAL_PROBE_CANNON",
        position: [1940.9963, 610.0005],
        curiosity: "SUNKEN_MODULE",
        isCuriosity: true,
    },
    {
        id: "OPC_SUNKEN_MODULE",
        name: "Probe Tracking Module",
        facts: {
            explore: [
                {
                    id: "OPC_SUNKEN_MODULE_X1",
                    text: "The Orbital Probe Cannon has launched millions of probes.",
                },
                {
                    id: "OPC_SUNKEN_MODULE_X2",
                    text: "The 9,318,054th probe located a deep space anomaly matching all known criteria for the Eye of the universe.",
                },
                {
                    id: "OPC_SUNKEN_MODULE_X3",
                    text: "The statue in the Probe Tracking Module automatically records each probe's trajectory and transmits the data to the Ash Twin Project.",
                },
                {
                    id: "OPC_EYE_COORDINATES_X1",
                    text: "I found Nomai coordinates marking the location of the Eye of the universe.",
                },
            ],
            rumor: [
                {
                    id: "OPC_SUNKEN_MODULE_R1",
                    text: "One of the Orbital Probe Cannon’s three modules.",
                },
                {
                    id: "OPC_SUNKEN_MODULE_R5",
                    text: "The Probe Tracking Module is receiving data from the launched probe.",
                },
                {
                    id: "OPC_SUNKEN_MODULE_R4",
                    text: "Any Nomai aboard the Probe Tracking Module would be the first to see the coordinates of the Eye of the universe.",
                },
                {
                    id: "OPC_SUNKEN_MODULE_R2",
                    text: "A Nomai computer reports the Probe Tracking Module as \"missing.\"",
                },
                {
                    id: "OPC_SUNKEN_MODULE_R3",
                    text: "I saw the Probe Tracking Module through a Nomai projection pool. It looks like the module is underwater. I could see purple electricity outside the viewport.",
                },
            ],
        },
        astroObject: "ORBITAL_PROBE_CANNON",
        position: [2056.9976, 446.0063],
        curiosity: "SUNKEN_MODULE",
        parent: "ORBITAL_PROBE_CANNON",
    },
    {
        id: "OPC_BROKEN_MODULE",
        name: "Launch Module",
        facts: {
            explore: [
                {
                    id: "OPC_BROKEN_MODULE_X1",
                    text: "The Launch Module is badly damaged, but its projection pool is still intact.",
                },
                {
                    id: "OPC_BROKEN_MODULE_X2",
                    text: "A Nomai named Mallow argued that it wouldn't matter if the cannon's structural integrity was compromised, since they only needed to fire the probe once.",
                },
                {
                    id: "OPC_BROKEN_MODULE_X3",
                    text: "A Nomai named Privet countered that they wouldn't be capable of receiving the probe's data if the Probe Tracking Module was destroyed.",
                },
            ],
            rumor: [
                {
                    id: "OPC_BROKEN_MODULE_R1",
                    text: "One of the Orbital Probe Cannon’s three modules.",
                },
                {
                    id: "OPC_BROKEN_MODULE_R2",
                    text: "The Launch Module looks heavily damaged. There’s a huge breach in the glass viewport.",
                },
                {
                    id: "OPC_BROKEN_MODULE_R3",
                    text: "The Launch Module's viewport window is fractured, exposing it to the vacuum of space.",
                },
            ],
        },
        astroObject: "ORBITAL_PROBE_CANNON",
        position: [1937.9973, 445.99536],
        curiosity: "SUNKEN_MODULE",
        parent: "ORBITAL_PROBE_CANNON",
    },
    {
        id: "OPC_INTACT_MODULE",
        name: "Control Module",
        facts: {
            explore: [
                {
                    id: "OPC_INTACT_MODULE_X1",
                    text: "The Control Module (recently) received a request from the Ash Twin Project to launch the probe. The cannon was aligned with a randomly selected probe trajectory.",
                },
                {
                    id: "OPC_INTACT_MODULE_X2",
                    text: "The probe was successfully launched, but the cannon's structural integrity was compromised in the process. Damage is detected in multiple modules.",
                },
            ],
            rumor: [
                {
                    id: "OPC_INTACT_MODULE_R1",
                    text: "One of the Orbital Probe Cannon’s three modules.",
                },
            ],
        },
        astroObject: "ORBITAL_PROBE_CANNON",
        position: [1818.9972, 448.00635],
        curiosity: "SUNKEN_MODULE",
        parent: "ORBITAL_PROBE_CANNON",
    },
    {
        id: "DB_FELDSPAR",
        name: "Feldspar’s Camp",
        facts: {
            explore: [
                {
                    id: "DB_FELDSPAR_X1",
                    text: "Feldspar is alive! They crashed their ship and is now camping inside a huge anglerfish skeleton.",
                },
                {
                    id: "DB_FELDSPAR_X2",
                    text: "Feldspar doesn't think my scout tracker is wrong when it says my scout is in two places at once. They have a theory that space doesn’t work the same inside Dark Bramble.",
                },
                {
                    id: "DB_FELDSPAR_X3",
                    text: "Feldspar doesn't sound overly eager to return to civilization. They've been enjoying the (relative) peace and quiet.",
                },
            ],
            rumor: [
                {
                    id: "DB_FELDSPAR_R1",
                    text: "Feldspar headed off to Dark Bramble after reaching the core of Giant's Deep.",
                    sourceID: "GD_BRAMBLE_ISLAND",
                },
                {
                    id: "DB_FELDSPAR_R2",
                    text: "When I launch my scout into the seed that crashed on Timber Hearth, it ends up in a much bigger space filled with fog and thorny vines.",
                    sourceID: "TH_IMPACT_CRATER",
                },
            ],
        },
        astroObject: "DARK_BRAMBLE",
        position: [2711, 622],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "DB_FROZEN_JELLYFISH",
        name: "Frozen Jellyfish",
        facts: {
            explore: [
                {
                    id: "DB_FROZEN_JELLYFISH_X1",
                    text: "Feldspar documented their attempts to eat this enormous jellyfish frozen in the ice. The outside was all rubbery and tough, possibly because it insulates the jellyfish’s insides from getting zapped by electricity.",
                },
                {
                    id: "DB_FROZEN_JELLYFISH_X2",
                    text: "Feldspar decided to venture into the jellyfish’s interior cavity to see if it tasted any better on the inside.",
                },
                {
                    id: "DB_FROZEN_JELLYFISH_X3",
                    text: "After tasting the inside of the jellyfish, Feldspar concluded that these jellyfish are only useful for insulation from electricity.",
                },
            ],
            rumor: [
                {
                    id: "DB_FROZEN_JELLYFISH_R1",
                    text: "Feldspar hinted that a secret to reaching the core of Giant's Deep lies at the end of the hollow vine they crashed their ship into. To find Feldspar's ship, I'll want to go to the tail end of the anglerfish skeleton and look for a flickering light in the fog.",
                    sourceID: "DB_FELDSPAR",
                },
            ],
        },
        astroObject: "DARK_BRAMBLE",
        position: [2984, 511],
        curiosity: "SUNKEN_MODULE",
    },
    {
        id: "DB_ESCAPE_POD",
        name: "Escape Pod 3",
        facts: {
            explore: [
                {
                    id: "DB_ESCAPE_POD_X1",
                    text: "One of three Nomai escape pods that crashed in our solar system.",
                },
                {
                    id: "DB_ESCAPE_POD_X2",
                    text: "All three escape pods were launched from something called the Vessel, which was badly damaged.",
                },
                {
                    id: "DB_ESCAPE_POD_X3",
                    text: "The survivors from Escape Pod 3 detected two distinct beacons from the Vessel, as if it was in two locations at once.",
                },
            ],
            rumor: [
                {
                    id: "DB_ESCAPE_POD_R1",
                    text: "One of the three Nomai escape pods never made it out of Dark Bramble.",
                    sourceID: "BH_MURAL_3",
                },
            ],
        },
        astroObject: "DARK_BRAMBLE",
        position: [-292, -800],
        curiosity: "VESSEL",
    },
    {
        id: "DB_NOMAI_GRAVE",
        name: "Nomai Grave",
        facts: {
            explore: [
                {
                    id: "DB_NOMAI_GRAVE_X1",
                    text: "The survivors from Escape Pod 3 followed one of the two Vessel beacons to a small Dark Bramble seed, where they could go no further.",
                },
                {
                    id: "DB_NOMAI_GRAVE_X2",
                    text: "The Nomai could faintly hear the Vessel's beacon from within the seed, but the opening was too small for a single Nomai to fit through, much less an escape pod.",
                },
                {
                    id: "DB_NOMAI_GRAVE_X3",
                    text: "The Vessel's beacon was dying, and would soon be gone completely.",
                },
                {
                    id: "DB_NOMAI_GRAVE_X4",
                    text: "If I launch my scout into the seed, I can take photos of an enormous derelict Nomai ship.",
                },
            ],
            rumor: [
                {
                    id: "DB_NOMAI_GRAVE_R1",
                    text: "The survivors from Escape Pod 3 abandoned the wreckage and attempted to return to the Vessel.",
                    sourceID: "DB_ESCAPE_POD",
                },
                {
                    id: "DB_NOMAI_GRAVE_R2",
                    text: "The survivors decided to follow the closer of the two Vessel beacons due to their limited air supply. They planned to leave a trail of lights behind them in case someone heard their distress signal.",
                    sourceID: "DB_ESCAPE_POD",
                },
            ],
        },
        astroObject: "DARK_BRAMBLE",
        position: [-387, -1069],
        curiosity: "VESSEL",
    },
    {
        id: "DB_VESSEL",
        name: "The Vessel",
        facts: {
            explore: [
                {
                    id: "DB_VESSEL_X1",
                    text: "I found the derelict Nomai Vessel deep within Dark Bramble.",
                },
                {
                    id: "DB_VESSEL_X2",
                    text: "The Vessel's warp core is long dead.",
                },
                {
                    id: "DB_VESSEL_X3",
                    text: "I activated a three-sided pillar on the Vessel's bridge that appears to be some sort of input device.",
                },
                {
                    id: "DB_VESSEL_X4",
                    text: "The Nomai tried to call for help, but the Vessel's outgoing message system broke during the crash.",
                },
                {
                    id: "DB_VESSEL_X5",
                    text: "The Vessel can still hear incoming messages from other Nomai vessels. The remaining Nomai clans are regrouping in response to the impending death of the universe.",
                },
                {
                    id: "DB_VESSEL_X6",
                    text: "I found a recording of the original signal the Nomai encountered from the Eye of the universe. The Nomai were worried the signal might disappear, so they warped before they could tell another clan where they were going.",
                },
            ],
            rumor: [
                {
                    id: "DB_VESSEL_R1",
                    text: "The Nomai warped to this solar system in a spaceship called the Vessel. They were attempting to follow a signal from the Eye of the universe.",
                },
                {
                    id: "DB_VESSEL_R2",
                    text: "The Vessel crashed somewhere in Dark Bramble.",
                    sourceID: "BH_MURAL_3",
                },
                {
                    id: "DB_VESSEL_R3",
                    text: "The Vessel's warp core broke when the ship crashed in Dark Bramble.",
                    sourceID: "BH_HANGING_CITY",
                },
                {
                    id: "DB_VESSEL_R4",
                    text: "I launched my scout into the seed at the Nomai Grave and took photos of an enormous derelict Nomai ship.",
                    sourceID: "DB_NOMAI_GRAVE",
                },
            ],
        },
        astroObject: "DARK_BRAMBLE",
        position: [105, -1016],
        curiosity: "VESSEL",
        isCuriosity: true,
    },
    {
        id: "WHITE_HOLE_STATION",
        name: "White Hole Station",
        facts: {
            explore: [
                {
                    id: "WHS_X4",
                    text: "Every Nomai warp tower is tuned to a specific astral body.",
                },
                {
                    id: "WHS_X1",
                    text: "To use a tower, you must be standing on the warp platform during the tower's alignment with its corresponding astral body (the alignment happens when the astral body is directly overhead).",
                },
                {
                    id: "WHS_X2",
                    text: "The Nomai noticed something strange: Warped objects appeared to arrive at the receiver on Brittle Hollow slightly before they departed the White Hole Station.",
                },
                {
                    id: "WHS_X3",
                    text: "This negative time interval between an object arriving and departing was incredibly miniscule (roughly one hundred-thousandth of a second). The Nomai were skeptical if their equipment could even measure time to such a small degree.",
                },
            ],
            rumor: [
                {
                    id: "WHS_R1",
                    text: "There is a White Hole Station on the other side of Brittle Hollow's black hole.",
                    sourceID: "BH_WARP_RECEIVER",
                },
                {
                    id: "WHS_R2",
                    text: "Several Nomai returned to the station to investigate an equipment reading that appeared to violate causality.",
                    sourceID: "BH_WARP_RECEIVER",
                },
                {
                    id: "WHS_R3",
                    text: "The experiments at the High Energy Lab were based on extraordinary findings from the White Hole Station.",
                    sourceID: "CT_HIGH_ENERGY_LAB",
                },
                {
                    id: "WHS_R4",
                    text: "The towers on Ash Twin were modeled after the White Hole Station.",
                    sourceID: "TT_WARP_TOWERS",
                },
            ],
        },
        astroObject: "WHITE_HOLE",
        position: [121, 674],
        curiosity: "TIME_LOOP",
    },
    {
        id: "COMET_SHUTTLE",
        name: "Frozen Nomai Shuttle",
        facts: {
            explore: [
                {
                    id: "COMET_SHUTTLE_X1",
                    text: "I found a Nomai shuttle almost completely encased in ice.",
                },
                {
                    id: "COMET_SHUTTLE_X2",
                    text: "The Nomai landed on the Interloper not long after its arrival in the solar system. The shuttle's equipment heard strange energy readings coming from somewhere beneath the surface.",
                },
                {
                    id: "COMET_SHUTTLE_X3",
                    text: "There were three Nomai aboard the shuttle. One of them stayed behind to keep the shuttle warm while the other two explored the Interloper.",
                },
                {
                    id: "COMET_SHUTTLE_X4",
                    text: "Clary, the Nomai who stayed behind, lost contact with the other two after they descended below the Interloper's surface.",
                },
            ],
            rumor: [],
        },
        astroObject: "COMET",
        position: [1592, -790],
        curiosity: "COMET_CORE",
    },
    {
        id: "COMET_INTERIOR",
        name: "Ruptured Core",
        facts: {
            explore: [
                {
                    id: "COMET_INTERIOR_X1",
                    text: "I found the two missing members of the Nomai shuttle crew near a large ruptured stone that looks like it exploded from the inside.",
                },
                {
                    id: "COMET_INTERIOR_X2",
                    text: "The Nomai traced the strange energy readings to a spherical stone casing filled with some form of exotic matter.",
                },
                {
                    id: "COMET_INTERIOR_X3",
                    text: "They determined the exotic matter was both lethal and under extreme pressure. If the stone were to rupture, the exotic matter within would rapidly expand, completely blanketing the solar system almost instantaneously.",
                },
                {
                    id: "COMET_INTERIOR_X4",
                    text: "One of the Nomai stayed behind to examine the alien matter while the other rushed back to the surface to warn the rest of the Nomai.",
                },
            ],
            rumor: [
                {
                    id: "COMET_INTERIOR_R1",
                    text: "The shuttle's equipment heard strange energy readings coming from somewhere beneath the surface.",
                    sourceID: "COMET_SHUTTLE",
                },
                {
                    id: "COMET_INTERIOR_R2",
                    text: "Two of the Nomai located a fissure in the ice on the Interloper’s sunward side. They descended inside to investigate.",
                    sourceID: "COMET_SHUTTLE",
                },
            ],
        },
        astroObject: "COMET",
        position: [1240.0012, -791.0067],
        curiosity: "COMET_CORE",
        isCuriosity: true,
    },
    {
        id: "QUANTUM_MOON",
        name: "Quantum Moon",
        facts: {
            explore: [
                {
                    id: "QUANTUM_MOON_X1",
                    text: "I was able to land on the surface of the Quantum Moon.",
                },
                {
                    id: "QUANTUM_MOON_X2",
                    text: "I found a dead Nomai in a space suit near the south pole.",
                },
            ],
            rumor: [
                {
                    id: "QUANTUM_MOON_R1",
                    text: "The Nomai on Brittle Hollow observed a phantom moon that would sometimes appear in the sky.",
                    sourceID: "BH_WARP_RECEIVER",
                },
                {
                    id: "QUANTUM_MOON_R2",
                    text: "The Nomai on Ember Twin observed a moon that would disappear when no one was watching.",
                    sourceID: "CT_QUANTUM_MOON_LOCATOR",
                },
                {
                    id: "QUANTUM_MOON_R3",
                    text: "A Nomai named Solanum landed a shuttle on the Quantum Moon.",
                },
                {
                    id: "QUANTUM_MOON_R4",
                    text: "Chert’s research notes mention a Quantum Moon that no Hearthian has been able to land on.",
                },
            ],
        },
        astroObject: "QUANTUM_MOON",
        position: [-229, 1383],
        curiosity: "QUANTUM_MOON",
        isCuriosity: true,
    },
    {
        id: "QM_SHUTTLE",
        name: "Solanum's Shuttle",
        facts: {
            explore: [
                {
                    id: "QM_SHUTTLE_X1",
                    text: "A Nomai named Solanum landed her shuttle at the Quantum Moon's south pole and prepared to make the rest of the journey on foot.",
                },
                {
                    id: "QM_SHUTTLE_X2",
                    text: "Visitors to the Quantum Moon always arrive at the south pole (for reasons unknown to the Nomai).",
                },
            ],
            rumor: [],
        },
        astroObject: "QUANTUM_MOON",
        position: [-93, 1375],
        curiosity: "QUANTUM_MOON",
        parent: "QUANTUM_MOON",
    },
    {
        id: "QM_SHRINE",
        name: "Quantum Shrine",
        facts: {
            explore: [
                {
                    id: "QM_SHRINE_X1",
                    text: "A Nomai shrine that wanders about the Quantum Moon.",
                },
                {
                    id: "QM_SHRINE_X2",
                    text: "\"You have recalled the rule of quantum imaging\" is inscribed next to a mural of a tower on an island.",
                },
                {
                    id: "QM_SHRINE_X3",
                    text: "\"Recall the rule of quantum entanglement\" is inscribed next to a mural of a quantum shard in a cave.",
                },
                {
                    id: "QM_SHRINE_X4",
                    text: "\"Recall the rule of the sixth location\" is inscribed next to a mural of a tower hanging above a black hole.",
                },
            ],
            rumor: [
                {
                    id: "QM_SHRINE_R1",
                    text: "The Nomai built a shrine on the Quantum Moon to aid in the pilgrimage to its sixth location.",
                    sourceID: "BH_QUANTUM_RESEARCH_TOWER",
                },
            ],
        },
        astroObject: "QUANTUM_MOON",
        position: [-368, 1395],
        curiosity: "QUANTUM_MOON",
        parent: "QUANTUM_MOON",
    },
    {
        id: "QM_SIXTH_LOCATION",
        name: "Sixth Location",
        facts: {
            explore: [
                {
                    id: "QM_SIXTH_LOCATION_X1",
                    text: "I met a living Nomai named Solanum at the south pole!",
                },
                {
                    id: "QM_SIXTH_LOCATION_X3",
                    text: "The Quantum Moon is the Eye of the universe's moon.",
                },
                {
                    id: "QM_SIXTH_LOCATION_X5",
                    text: "At this location, the Quantum Moon becomes a reflection of the Eye itself.",
                },
                {
                    id: "QM_SIXTH_LOCATION_X4",
                    text: "The Eye is likely the source of all macroscopic quantum phenomena in the solar system.",
                },
                {
                    id: "QM_SIXTH_LOCATION_X2",
                    text: "Solanum wonders what would happen if a concious observer were to enter the Eye.",
                },
                {
                    id: "QM_SIXTH_LOCATION_X6",
                    text: "Solanum has a hypothesis that she may not be entirely alive.",
                },
            ],
            rumor: [
                {
                    id: "QM_SIXTH_LOCATION_R1",
                    text: "The Quantum Moon sometimes disappears, possibly to an unknown sixth location.",
                    sourceID: "CT_QUANTUM_MOON_LOCATOR",
                },
                {
                    id: "QM_SIXTH_LOCATION_R2",
                    text: "Many Nomai went on a pilgrimage during which the Quantum Moon carried them to its sixth and most secret location.",
                    sourceID: "BH_QUANTUM_RESEARCH_TOWER",
                },
                {
                    id: "QM_SIXTH_LOCATION_R3",
                    text: "To explore the sixth location, the shrine on the Quantum Moon must be on the moon’s north pole.",
                    sourceID: "BH_QUANTUM_RESEARCH_TOWER",
                },
            ],
        },
        astroObject: "QUANTUM_MOON",
        position: [-368.0744, 1262.3943],
        curiosity: "QUANTUM_MOON",
        parent: "QUANTUM_MOON",
    },
    {
        id: "IP_RING_WORLD",
        name: "The Stranger",
        facts: {
            explore: [
                {
                    id: "IP_RING_WORLD_X1",
                    text: "A massive artificial ring world hidden within some sort of cloaking field. It does not appear to be Hearthian or Nomaian in origin.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2488.8025, -418.00003],
        curiosity: "INVISIBLE_PLANET",
        isCuriosity: true,
    },
    {
        id: "IP_ZONE_1",
        name: "River Lowlands",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_1_X1",
                    text: "A low-lying region near the entrance to the Stranger. There are wooden buildings along the banks of the river.",
                },
                {
                    id: "IP_ZONE_1_X2",
                    text: "I found several ornate metal artifacts inside a workshop surrounded by ghost matter.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3274.1025, -855],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_ZONE_1_STORY",
        name: "Burned Slide Reel",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_1_STORY_X1",
                    text: "A slide reel that shows the origin of the Stranger and its inhabitants.",
                },
                {
                    id: "IP_ZONE_1_STORY_X2",
                    text: "Several slides have been burned and cannot be viewed.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3312.3, -962.6],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_1",
    },
    {
        id: "IP_ZONE_1_SECRET",
        name: "Slide Burning Room",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_1_SECRET_X2",
                    text: "A room full of burned slide reels piled next to a strange device.",
                },
                {
                    id: "IP_ZONE_1_SECRET_X1",
                    text: "I found a hidden slide reel that shows a container marked with a glowing symbol being handed to a shadowy figure. The figure follows a procession of green lights through a forest to a candlelit building, where they carry the container into a secret passage behind a roaring fireplace.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_1_SECRET_R1",
                    text: "A map I found in the Abandoned Temple reveals a secret location somewhere within the Stranger.",
                    sourceID: "IP_MAP_PROJECTION_1",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3224.3008, -962.3],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_1",
    },
    {
        id: "IP_ZONE_2",
        name: "Cinder Isles",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_2_X1",
                    text: "A pair of small rocky islands connected by a village of stilt houses.",
                },
                {
                    id: "IP_ZONE_2_X2",
                    text: "I found a large metal symbol inside a burned-out building that closely resembles the Nomai symbol for the Eye of the universe.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2855.0024, -1227.9982],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_ZONE_2_STORY",
        name: "Burned Slide Reel",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_2_STORY_X1",
                    text: "A slide reel that shows the Stranger's inhabitants analyzing an anomaly that closely resembles the Nomai symbol for the Eye of the universe.",
                },
                {
                    id: "IP_ZONE_2_STORY_X2",
                    text: "Several slides have been burned and cannot be viewed.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2888.8, -1331.1],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_2",
    },
    {
        id: "IP_ZONE_2_SECRET",
        name: "Slide Burning Room",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_2_SECRET_X2",
                    text: "A room full of burned slide reels piled next to a strange device.",
                },
                {
                    id: "IP_ZONE_2_SECRET_X1",
                    text: "I found a hidden slide reel that shows a container marked with a glowing symbol being handed to a shadowy figure. The lights are extinguished, and the figure carries the container down into a dark well.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_2_SECRET_R1",
                    text: "A map I found in the Abandoned Temple reveals a secret location somewhere within the Stranger.",
                    sourceID: "IP_MAP_PROJECTION_2",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2802.1025, -1331.001],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_2",
    },
    {
        id: "IP_ZONE_2_LIGHTHOUSE",
        name: "Island Tower",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_2_LIGHTHOUSE_X2",
                    text: "A tower that sits atop one of the Cinder Isles. The upper floors can only be reached from a second entrance at the back of the tower.",
                },
                {
                    id: "IP_ZONE_2_LIGHTHOUSE_X1",
                    text: "I found a slide reel that shows the Stranger's inhabitants opening a secret passage in a round room filled with lanterns and murals. The inhabitants are shown filing into three of these rooms throughout the Stranger.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_2_LIGHTHOUSE_R1",
                    text: "I found a projection that reveals a cave entrance at the base of a rocky island with a tall tower.",
                    sourceID: "IP_ZONE_2",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3073, -1225],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_ZONE_2_CODE",
        name: "Symbol Room",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_2_CODE_X1",
                    text: "A secret room filled with wooden containers marked with different symbols.",
                },
                {
                    id: "IP_ZONE_2_CODE_X2",
                    text: "Three of the containers are marked with glowing vault seals, but their contents have been burned away.",
                },
                {
                    id: "IP_ZONE_2_CODE_X3",
                    text: "I opened the container marked with the symbol of a burning slide reel and found a vertical sequence of symbols inside.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_2_CODE_R1",
                    text: "The light coming out of the vault gave me a vision of climbing a spiral staircase to a room near the top of a tower. One of the Stranger's inhabitants pointed at a mural of an identical tower beneath a ringed planet, then picked up an artifact and carried it downstairs to a room with a green fire. Some time later, two of the lamps in the mural room turned off, plunging the mural into darkness and revealing a secret passage.",
                    sourceID: "IP_DREAM_LAKE",
                },
                {
                    id: "IP_ZONE_2_CODE_R2",
                    text: "The passage lead to three wooden containers, each marked with a glowing vault seal.",
                    sourceID: "IP_DREAM_LAKE",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3036.5027, -1112.8992],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_2_LIGHTHOUSE",
    },
    {
        id: "IP_ZONE_3",
        name: "Hidden Gorge",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_3_X1",
                    text: "A narrow gorge along the rightmost branch of the river. There are dwellings built into both cliff faces high above.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2447, -855],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_ZONE_3_SECRET",
        name: "Slide Burning Room",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_3_SECRET_X2",
                    text: "A room full of burned slide reels piled next to a strange device.",
                },
                {
                    id: "IP_ZONE_3_SECRET_X1",
                    text: "I found a hidden slide reel that shows a container marked with a glowing symbol being handed to a shadowy figure. The lights are extinguished, and the figure carries the container into a secret passage behind a mural of a large tree.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_3_SECRET_R1",
                    text: "A map I found in the Abandoned Temple reveals a secret location somewhere within the Stranger.",
                    sourceID: "IP_MAP_PROJECTION_3",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2477.4006, -966.7],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3",
    },
    {
        id: "IP_ZONE_3_STORY",
        name: "Burned Slide Reel",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_3_STORY_X1",
                    text: "A slide reel that shows the Stranger's inhabitants congregating around a strange green fire.",
                },
                {
                    id: "IP_ZONE_3_STORY_X2",
                    text: "Several slides have been burned and cannot be viewed.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2390.5, -966.7],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3",
    },
    {
        id: "IP_ZONE_3_ENTRANCE",
        name: "Damaged Laboratory",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_3_ENTRANCE_X1",
                    text: "A laboratory with three test chambers. The second chamber is badly damaged and can be entered through a hull breach in the side of the Stranger.",
                },
                {
                    id: "IP_ZONE_3_ENTRANCE_X2",
                    text: "I saw a vision-like recording of someone picking up an artifact and going to sleep in front of a green fire. The rest of the vision was distorted and difficult to make out, but a flame seemed to appear inside the artifact.",
                },
                {
                    id: "IP_ZONE_3_ENTRANCE_X3",
                    text: "I found a slide reel that shows three experiments conducted with three different artifacts. The third experiment appears to have been a success.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_3_ENTRANCE_R1",
                    text: "I found a slide reel in the Hidden Gorge that shows an explosion blowing a hole in the side of the Stranger.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2389.9026, -741.7],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3",
    },
    {
        id: "IP_ZONE_3_LAB",
        name: "Abandoned Temple",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_3_LAB_X1",
                    text: "An abandoned temple marked with the symbol of a burning slide reel. It can be accessed from a passage in the Hidden Gorge.",
                },
                {
                    id: "IP_ZONE_3_LAB_X3",
                    text: "There is an interface upstairs that can be used to line up symbols in a vertical sequence.",
                },
                {
                    id: "IP_ZONE_3_LAB_X4",
                    text: "Entering the correct sequence opens the path to a secret room beneath the temple.",
                },
                {
                    id: "IP_ZONE_3_LAB_X2",
                    text: "I found a slide reel that shows the Stranger's inhabitants removing all of the slide reels from their shelves, scanning each reel with a device, and incinerating specific slides as well as entire reels.",
                },
            ],
            rumor: [
                {
                    id: "IP_ZONE_3_LAB_R1",
                    text: "I saw a building marked with a unique symbol recessed into one of the canyon walls, but the bridge that used to lead to it has rotted away.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2654.8025, -982],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_MAP_PROJECTION_1",
        name: "Map Projection 1",
        facts: {
            explore: [
                {
                    id: "IP_MAP_PROJECTION_1_X1",
                    text: "A projection that seems to reveal a secret location somewhere within the Stranger.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2736.1025, -1098.2001],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3_LAB",
    },
    {
        id: "IP_MAP_PROJECTION_2",
        name: "Map Projection 2",
        facts: {
            explore: [
                {
                    id: "IP_MAP_PROJECTION_2_X1",
                    text: "A projection that seems to reveal a secret location somewhere within the Stranger.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2655.9028, -1098.8],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3_LAB",
    },
    {
        id: "IP_MAP_PROJECTION_3",
        name: "Map Projection 3",
        facts: {
            explore: [
                {
                    id: "IP_MAP_PROJECTION_3_X1",
                    text: "A projection that seems to reveal a secret location somewhere within the Stranger.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2576.4033, -1097.7997],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_3_LAB",
    },
    {
        id: "IP_ZONE_4",
        name: "Reservoir",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_4_X2",
                    text: "An enormous reservoir with wooden piers and buildings on both shores.",
                },
                {
                    id: "IP_ZONE_4_X3",
                    text: "I found a room with a burned control interface and a projection that seems to indicate a broken connection between the Stranger and another craft.",
                },
                {
                    id: "IP_ZONE_4_X4",
                    text: "I found a projection showing the Stranger's current trajectory and the sun's predicted supernova radius.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2854.8025, -447.00003],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_ZONE_4_STORY",
        name: "Burned Slide Reel",
        facts: {
            explore: [
                {
                    id: "IP_ZONE_4_STORY_X1",
                    text: "A slide reel that shows a strange vault being encased in a large metal structure and lowered underwater.",
                },
                {
                    id: "IP_ZONE_4_STORY_X2",
                    text: "Nearly all of the slides have been burned and cannot be viewed.",
                },
            ],
            rumor: [],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2908.28, -543.00006],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_ZONE_4",
    },
    {
        id: "IP_PRISON",
        name: "Submerged Structure",
        facts: {
            explore: [
                {
                    id: "IP_PRISON_X1",
                    text: "A large metal structure suspended by chains. It can be entered by swimming from below.",
                },
                {
                    id: "IP_PRISON_X2",
                    text: "There is a sealed vault illuminated by a green fire inside the structure.",
                },
            ],
            rumor: [
                {
                    id: "IP_PRISON_R1",
                    text: "According to a slide reel, a strange vault was encased in a large metal structure and lowered underwater.",
                    sourceID: "IP_ZONE_4_STORY",
                },
                {
                    id: "IP_PRISON_R2",
                    text: "I found a diagram of a hollow metal structure suspended by chains. There is a round hole underneath that appears to be the only entrance.",
                    sourceID: "IP_ZONE_4",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2854.8025, -750],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_DREAM_LAKE",
        name: "Subterranean Lake",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_LAKE_X1",
                    text: "I discovered a vast subterranean lake beneath the submerged structure. The sealed vault is resting on the shore of the lake. There are three interfaces, each marked with one of the three symbols from the vault.",
                },
                {
                    id: "IP_DREAM_LAKE_X2",
                    text: "I rotated the mechanism in front of the vault, causing it to strain against the chains holding it shut. Moments later rays of green light spilled out of the vault.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_LAKE_R1",
                    text: "I looked through a peephole in the side of a large metal structure suspended by chains. Inside is another green fire and a staircase leading farther below.",
                },
                {
                    id: "IP_DREAM_LAKE_R2",
                    text: "I saw a vision-like recording of two figures taking artifacts into a large metal structure suspended by chains and going to sleep at the green fire in front of the sealed vault. Upon waking up with lit artifacts, the two figures picked up the vault and carried it down a staircase to somewhere farther below.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2935.8025, -754.0012],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_PRISON",
    },
    {
        id: "IP_SARCOPHAGUS",
        name: "Sealed Vault",
        facts: {
            explore: [
                {
                    id: "IP_SARCOPHAGUS_X2",
                    text: "I met one of the Stranger's inhabitants who was imprisoned within the vault!",
                },
                {
                    id: "IP_SARCOPHAGUS_X3",
                    text: "The Prisoner showed me a vision revealing the actions they took that resulted in their eternal confinement.",
                },
                {
                    id: "IP_SARCOPHAGUS_X4",
                    text: "I used the vision torch to share my knowledge of the solar system's history with the Prisoner.",
                },
                {
                    id: "IP_SARCOPHAGUS_X5",
                    text: "The Prisoner left one final vision for me by the water's edge as a farewell.",
                },
            ],
            rumor: [
                {
                    id: "IP_SARCOPHAGUS_R4",
                    text: "I found a strange vault wrapped in chains and marked with three glowing symbols.",
                },
                {
                    id: "IP_SARCOPHAGUS_R1",
                    text: "A slide reel from the River Lowlands showed a strange vault being closed and sealed with chains and a glowing symbol.",
                    sourceID: "IP_ZONE_1",
                },
                {
                    id: "IP_SARCOPHAGUS_R2",
                    text: "A slide reel from the Cinder Isles showed a glowing symbol and chains appear around a strange vault.",
                    sourceID: "IP_ZONE_2",
                },
                {
                    id: "IP_SARCOPHAGUS_R3",
                    text: "A slide reel from the Hidden Gorge showed a glowing symbol and chains appear around a strange vault.",
                    sourceID: "IP_ZONE_3",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2854.8025, -854.0012],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_PRISON",
    },
    {
        id: "IP_DREAM_ZONE_1",
        name: "Shrouded Woodlands",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_ZONE_1_X1",
                    text: "A dense forest along the banks of a river.",
                },
                {
                    id: "IP_DREAM_ZONE_1_X2",
                    text: "I heard music coming from a candlelit building across the water.",
                },
                {
                    id: "IP_DREAM_ZONE_1_X3",
                    text: "I found a covered bridge leading into the darkest part of the forest.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_ZONE_1_R1",
                    text: "I rode a raft through a densely wooded stretch of river. I can see buildings along the banks of the river.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3341.8005, -1394.5995],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_DREAM_LIBRARY_1",
        name: "Forbidden Archive",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_LIBRARY_1_X1",
                    text: "A library full of intact slide reels hidden deep underground.",
                },
                {
                    id: "IP_DREAM_LIBRARY_1_X2",
                    text: "There is a container marked with one of the vault seals, but its contents have been destroyed.",
                },
                {
                    id: "IP_DREAM_1_STORY_X1",
                    text: "I found a slide reel that shows the origin of the Stranger and its inhabitants.",
                },
                {
                    id: "IP_DREAM_1_STORY_X2",
                    text: "Intact slides reveal the sacrifice that was made to build the Stranger.",
                },
                {
                    id: "IP_DREAM_1_RULE_X1",
                    text: "I found a slide reel that appears to be some sort of error report. It shows one of the Stranger's inhabitants jumping off a raft during a transition between areas and falling below the world.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_LIBRARY_1_R1",
                    text: "I found a hidden slide reel that shows a container marked with a glowing symbol being handed to a shadowy figure. The figure follows a procession of lights through a forest to a candlelit building, where they carry the container into a secret passage behind a roaring fireplace.",
                    sourceID: "IP_ZONE_1_SECRET",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [3266, -1344.9998],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_DREAM_ZONE_1",
    },
    {
        id: "IP_DREAM_ZONE_2",
        name: "Starlit Cove",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_ZONE_2_X1",
                    text: "A secluded village nestled within a cove. A candlelit tower sits atop a nearby island.",
                },
                {
                    id: "IP_DREAM_ZONE_2_X2",
                    text: "The well at the bottom of the village is guarded by a statue that activates an alarm bell when it sees me.",
                },
                {
                    id: "IP_DREAM_ZONE_2_X3",
                    text: "I found the remains of a burned-out building on the outskirts of the village.",
                },
                {
                    id: "IP_DREAM_ZONE_2_X4",
                    text: "I reached the tower's upper floors by projecting a path to a second entrance at the back of the tower.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_ZONE_2_R1",
                    text: "I rode a raft past an island with a tall candlelit tower.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2855.002, -1577],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_DREAM_LIBRARY_2",
        name: "Forbidden Archive",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_LIBRARY_2_X1",
                    text: "A library full of intact slide reels hidden deep underground.",
                },
                {
                    id: "IP_DREAM_LIBRARY_2_X2",
                    text: "There is a container marked with one of the vault seals, but its contents have been destroyed.",
                },
                {
                    id: "IP_DREAM_2_STORY_X1",
                    text: "I found a slide reel that shows the Stranger's inhabitants analyzing an anomaly that closely resembles the Nomai symbol for the Eye of the universe.",
                },
                {
                    id: "IP_DREAM_2_STORY_X2",
                    text: "Intact slides reveal the construction and launch of a spacecraft designed to block the Eye's signal.",
                },
                {
                    id: "IP_DREAM_2_RULE_X1",
                    text: "I found a slide reel that shows two artifacts being lit near a green fire. The first artifact lights after its bearer falls asleep, and the second artifact lights after its bearer dies.",
                },
                {
                    id: "IP_DREAM_2_RULE_X2",
                    text: "I found a slide reel that appears to be some sort of error report. It shows an alarm bell failing to wake up one of the Stranger's inhabitants.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_LIBRARY_2_R1",
                    text: "The reel I found in the slide burning room shows a container marked with a glowing symbol being handed to a shadowy figure. The lights are extinguished, and the figure carries the container down into a dark well.",
                    sourceID: "IP_ZONE_2_SECRET",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2770, -1523.9998],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_DREAM_ZONE_2",
    },
    {
        id: "IP_DREAM_ZONE_3",
        name: "Endless Canyon",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_ZONE_3_X1",
                    text: "A massive canyon that stretches into the distance. A candlelit lodge is built into the far cliff face.",
                },
                {
                    id: "IP_DREAM_ZONE_3_X2",
                    text: "I found a mural of a large tree on the bottom floor of the lodge.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_ZONE_3_R1",
                    text: "I rode a raft through the bottom of a massive canyon. It looks like there are buildings set into the cliff face high above.",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2375.0981, -1394.5995],
        curiosity: "INVISIBLE_PLANET",
    },
    {
        id: "IP_DREAM_LIBRARY_3",
        name: "Forbidden Archive",
        facts: {
            explore: [
                {
                    id: "IP_DREAM_LIBRARY_3_X1",
                    text: "A library full of intact slide reels hidden deep underground.",
                },
                {
                    id: "IP_DREAM_LIBRARY_3_X2",
                    text: "There is a container marked with one of the vault seals, but its contents have been destroyed.",
                },
                {
                    id: "IP_DREAM_3_STORY_X1",
                    text: "I found a slide reel that shows the Stranger's inhabitants congregating around a strange green fire.",
                },
                {
                    id: "IP_DREAM_3_STORY_X2",
                    text: "Intact slides reveal the creation of a simulated reality modeled after their home moon.",
                },
                {
                    id: "IP_DREAM_3_RULE_X1",
                    text: "I found a slide reel that appears to be some sort of error report. It shows one of the Stranger's inhabitants dropping their artifact on the ground and walking beyond its projection radius.",
                },
            ],
            rumor: [
                {
                    id: "IP_DREAM_LIBRARY_3_R1",
                    text: "The reel I found in the slide burning room shows a container marked with a glowing symbol being handed to a shadowy figure. The lights are extinguished, and the figure carries the container into a secret passage behind a mural of a large tree.",
                    sourceID: "IP_ZONE_3_SECRET",
                },
            ],
        },
        astroObject: "INVISIBLE_PLANET",
        position: [2295, -1345],
        curiosity: "INVISIBLE_PLANET",
        parent: "IP_DREAM_ZONE_3",
    },
]
