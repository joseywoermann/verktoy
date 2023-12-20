import { Client as DiscordClient, Partials } from "discord.js";
import { intents } from "#util";

export class CustomClient extends DiscordClient {
    constructor() {
        super({ intents: intents, partials: [Partials.Message, Partials.Reaction] });
    }
}
