import type { ApplicationCommandDataResolvable } from "discord.js";
import { commands } from "./commands/__loader.js";
import { handleInteraction } from "./handlers/interaction.js";
import { devServerId, isDev, presence, token, logger, CustomClient } from "#util";

const client = new CustomClient();
client.login(token);

client.once("ready", async () => {
    logger.info(`[DISCORD]  Logged in as "${client.user.tag}"`);
    if (!isDev) {
        // client.metrics.autopost();
    }
    client.user.setPresence(presence);

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
        // await client.metrics.postCommand(interaction.commandName, interaction.user.id);
    }
    handleInteraction(interaction);
});

// client.on("messageCreate", async (msg) => {
//     logger.debug(msg.content);
//     if (msg.author.id === client.user.id) return;

//     if (msg.content === "h") {
//         await msg.reply({ content: "https://twitter.com/telegram/status/1469315579777540098" });
//     }
// });

// client.metrics.on("autopost-start", () => {
//     logger.info(`[STATCORD] Started automatic statistics posting`);
// });
