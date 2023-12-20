import { GatewayIntentBits, PresenceData, ActivityType } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

/** `true` if the `ENVIRONMENT` env-veriable is set to `dev` */
export const isDev: boolean = process.env.ENVIRONMENT === "dev";

export const ownerID = "586206645592391711";
export const devServerId = "915865795593125889";
export const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
];
export const token = process.env.TOKEN ?? "No token provided";
export const defaultPresence: PresenceData = {
    status: "online",
    activities: [{ type: ActivityType.Custom, name: "Watching you" }],
};

export const brandColor: number = 0xd329a0; // #D329A0
