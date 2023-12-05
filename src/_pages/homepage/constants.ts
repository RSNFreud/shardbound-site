import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Jay from './images/jay.webp'
import Freud from './images/freud.webp'
import Matty from './images/matty.webp'
import Breadge from './images/breadge.webp'
import Fox from './images/fox.webp'
import Bonne from './images/bonne.webp'
import Levi from './images/levi.webp'
import Lux from './images/Lux.webp'
import Pyder from './images/pyder.webp'
import Bonker from './images/bonker.webp'
import Wright from './images/wright.webp'
import Hell from './images/stick.png'
import Snow from './images/snow.webp'
import Symbiance from './images/symbiance.webp'
import Cody from './images/cody.webp'
import Evat from './images/evat.webp'

export const roles = [
    "Development Managers",
    "Mod Developers",
    "Designers",
    "Artists",
    "Builders",
] as const;

export const TEAM_MEMBERS: {
    group: typeof roles[number][];
    image?: string | StaticImport
    role: string,
    name: string,
    location: string
    discord?: string
    twitter?: string
    twitch?: string
    reddit?: string
    youtube?: string
}[] = [
        {
            group: ["Development Managers"],
            role: "Lead",
            image: Jay,
            name: "Jay",
            location: "Belgium",
            discord: "380999267524935680"
        },
        {
            group: ["Development Managers"],
            role: "Development & Design Manager",
            name: "Freud",
            image: Freud,
            twitter: 'freudplays_',
            twitch: 'freudplays',
            location: "The Universe",
            discord: "628703380851916827"
        },
        {
            group: ["Development Managers"],
            role: "Art & Build Manager",
            image: Matty,
            name: "Matty",
            location: "United Kingdom",
            discord: "167229893527076864"
        },
        {
            group: ["Artists"],
            role: "Artist",
            image: Breadge,
            name: "Bread",
            location: "Taiwan",
            discord: "587623686714949655"
        },
        {
            group: ["Artists", "Builders"],
            role: "Artist & Builder",
            image: Fox,
            name: "Fox",
            location: "Italy",
            twitch: "TheFoxGamer20210",
            youtube: "TheFoxGamer20210",
            twitter: "TheFoxGamer20210",
            discord: "760842243471966248"
        },
        {
            group: ["Mod Developers"],
            role: "Mod Developer",
            image: Bonne,
            name: "BONNe",
            location: "Latvia",
            discord: "488608806356516866"
        },
        {
            group: ["Mod Developers"],
            role: "Mod Developer",
            name: "Leo",
            location: "Italy",
            discord: "536994802529599509",
            reddit: "leyo05"
        },
        {
            group: ["Builders"],
            role: "Builder",
            name: "Levi",
            image: Levi,
            location: "Netherlands",
            discord: "787707627039621150",
        },
        {
            group: ["Designers"],
            role: "Designer",
            name: "Lux Caeruleus",
            image: Lux,
            location: "Philippines",
            discord: "463577575533314049",
        },
        {
            group: ["Builders", "Artists"],
            role: "Artist & Builder",
            name: "Pydermandy",
            image: Pyder,
            location: "United States",
            discord: "230121806734819329",
        },
        {
            group: ["Mod Developers"],
            role: "Mod Developer",
            name: "bonker",
            image: Bonker,
            location: "United States",
            discord: "772107911265910817",
        },
        {
            group: ["Builders"],
            role: "Builder",
            name: "Master Wright",
            image: Wright,
            location: "United States",
            discord: "346709211666972682",
        },
        {
            group: ["Designers"],
            role: "Designer",
            name: "Hellfirem4ge",
            image: Hell,
            location: "United Kingdom",
            discord: "186189755111833600",
            youtube: "@hellfirem4ge",
            twitch: "therealhellfirem4ge"
        },
        {
            group: ["Designers"],
            role: "Designer",
            name: "snow",
            image: Snow,
            location: "United States",
            discord: "170749628826910720",
        },
        {
            group: ["Mod Developers"],
            role: "Mod Developer",
            name: "Symbiance",
            image: Symbiance,
            location: "United States",
            discord: "200104771510730752",
        },
        {
            group: ["Mod Developers"],
            role: "Mod Developer",
            name: "codyhuh",
            image: Cody,
            location: "United States",
            discord: "224632987566866432",
        },
        {
            group: ["Designers"],
            role: "Designer",
            name: "Evat",
            image: Evat,
            location: "United States",
            discord: "803713655912267797",
            twitter: "EvatLeigh"
        }
    ]