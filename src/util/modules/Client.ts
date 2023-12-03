import { Client as DiscordClient, Partials } from "discord.js";
// import { Client as StatcordClient } from "statcord.js";
import { intents, statcordToken } from "#util";

export class CustomClient extends DiscordClient {
    /**
     * The Statcord-client for metrics
     */
    // metrics: StatcordClient;

    constructor() {
        super({ intents: intents, partials: [Partials.Message, Partials.Reaction] });
        // this.metrics = new StatcordClient({ client: this, key: statcordToken });
    }
}
