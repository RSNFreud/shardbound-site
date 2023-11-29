export const roles = [
    "Development Managers",
    "Mod Developers",
    "Artists",
    "Builders",
    "Designers",
] as const;

export const TEAM_MEMBERS: {
    group: typeof roles[number];
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
            name: "Jay",
            location: "Belgium",
            discord: "jaywithabeanie"
        },
        {
            group: "Development Managers",
            role: "Development & Design Manager",
            name: "Freud",
            location: "The Universe",
            discord: "freudplays"
        },
        {
            group: "Development Managers",
            role: "Build & Art Manager",
            name: "Matty",
            location: "United Kingdom",
            discord: "mattipoo"
        }
    ]