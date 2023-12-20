import type { ApplicationCommandDataResolvable } from "discord.js";
import { commands } from "./commands/__loader.js";
import { handleInteraction } from "./handlers/interaction.js";
import { devServerId, isDev, defaultPresence, token, logger, CustomClient } from "#util";

const client = new CustomClient();
client.login(token);

client.once("ready", async () => {
    logger.info(`[DISCORD]  Logged in as "${client.user.tag}"`);

    client.user.setPresence(defaultPresence);

    // update commands
    const cmds: ApplicationCommandDataResolvable[] = [...commands.values()];

    if (isDev) {
        await client.guilds.cache.get(devServerId)?.commands.set(cmds);
        logger.info(`[DISCORD]  Set guild commands`);
    } else {
        await client.application?.commands.set(cmds);
        logger.info(`[DISCORD]  Set global commands`);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) {
        logger.debug(`[DISCORD]  Handling interaction ${interaction.id} of type ${interaction.type}`);
    }
    if (interaction.isCommand() && !isDev) {
    }
    handleInteraction(interaction);
});
