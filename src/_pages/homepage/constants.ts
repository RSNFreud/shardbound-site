import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Jay from './images/jay.webp'
import Freud from './images/freud.webp'
import Matty from './images/matty.webp'

export const roles = [
    "Development Managers",
    "Mod Developers",
    "Artists",
    "Builders",
    "Designers",
] as const;

export const TEAM_MEMBERS: {
    group: typeof roles[number];
    image?: string | StaticImport
    role: string,
    name: string,
    location: string
    discord?: string
    twitter?: string
    twitch?: string
    youtube?: string
}[] = [
        {
            group: "Development Managers",
            role: "Lead",
            image: Jay,
            name: "Jay",
            location: "Belgium",
            discord: "380999267524935680"
        },
        {
            group: "Development Managers",
            role: "Development & Design Manager",
            name: "Freud",
            image: Freud,
            twitter: 'freudplays_',
            twitch: 'freudplays',
            location: "The Universe",
            discord: "628703380851916827"
        },
        {
            group: "Development Managers",
            role: "Build & Art Manager",
            image: Matty,
            name: "Matty",
            location: "United Kingdom",
            discord: "167229893527076864"
        }
    ]