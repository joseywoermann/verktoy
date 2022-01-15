import { Client as DiscordClient } from "discord.js";
import { Client as StatcordClient } from "statcord.js";
import { intents, statcordToken } from "#util/constants";

export class CustomClient extends DiscordClient {
    /**
     * The Statcord-client for metrics
     */
    metrics: StatcordClient;

    constructor() {
        super({ intents: intents });
        this.metrics = new StatcordClient({ client: this, key: statcordToken });
    }
}
