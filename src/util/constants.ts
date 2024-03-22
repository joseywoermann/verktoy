import { GatewayIntentBits, PresenceData, ActivityType } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

const { ENVIRONMENT, TOKEN, OWNER_ID, DEV_SERVER_ID } = process.env;

/** `true` if the `ENVIRONMENT` env-veriable is set to `dev` */
export const isDev: boolean = ENVIRONMENT === "dev";

export const ownerID = OWNER_ID;
export const devServerId = DEV_SERVER_ID;
export const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
];
export const token = TOKEN ?? "No token provided";
export const defaultPresence: PresenceData = {
    status: "online",
    activities: [{ type: ActivityType.Custom, name: "Watching you" }],
};

export const brandColor: number = 0xd329a0; // #D329A0
