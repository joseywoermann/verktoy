import { Client as DiscordClient } from "discord.js";
import { Client as StatcordClient } from "statcord.js";
import { intents, statcordToken } from "../constants.js";

export class CustomClient extends DiscordClient {
    stats: StatcordClient;

    constructor() {
        super({ intents: intents });
        this.stats = new StatcordClient({ client: this, key: statcordToken });
    }
}
