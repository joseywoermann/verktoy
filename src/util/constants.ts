import { Intents, PresenceData } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

export const isDev: boolean = process.env.ENVIRONMENT === "dev";

export const devServerId = "849379649917288508";
export const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS];
export const token = process.env.TOKEN ?? "No token provided";
export const statcordToken = process.env.STATCORD_TOKEN ?? "No token provided";
export const presence: PresenceData = {
    status: "online",
    activities: [{ type: "PLAYING", name: "with bots" }],
};
