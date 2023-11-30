import { Activity, GatewayIntentBits, PresenceData, ActivityType } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

/** `true` if the `ENVIRONMENT` env-veriable is set to `dev` */
export const isDev: boolean = process.env.ENVIRONMENT === "dev";

export const ownerID = "586206645592391711";
export const statisticsURL = "https://api.statcord.com/v3";
export const devServerId = "915865795593125889";
export const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages];
export const token = process.env.TOKEN ?? "No token provided";
export const statcordToken = process.env.STATCORD_TOKEN ?? "No token provided";
export const presence: PresenceData = {
    status: "online",
    activities: [{ type: ActivityType.Listening, name: "Slash Commands" }],
};

export const brandColor: number = 0xD329A0; // #D329A0
