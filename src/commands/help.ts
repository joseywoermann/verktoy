import * as fs from "fs";
import { EmbedBuilder, ApplicationCommandType } from "discord.js";
import { brandColor, ChatInputCommand } from "#util";

export const help: ChatInputCommand = {
    name: "help",
    description: "Show a list of all commands & what they do.",
    restricted: false,
    run: async (i) => {
        const commands = await listCommands();

        const embed = new EmbedBuilder({
            title: "Available commands:",
            color: brandColor,
            footer: { text: "Additional functionality is provided through context menus" },
        });

        let desc = `These are all the available commands.\n**Commands marked with an** \`[X]\` **are restricted and require elevated permissions.**\n`;

        // list commands
        desc += "```\n";

        commands.forEach((cmd) => {
            desc += `${cmd.restricted ? "[X] " : "[ ] "}/${cmd.name}: ${cmd.description}\n`;
        });

        desc += "```";

        embed.setDescription(desc);

        await i.reply({ embeds: [embed] });
    },
};

const listCommands = async (): Promise<ChatInputCommand[]> => {
    const commands: ChatInputCommand[] = [];
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter(
            (file) =>
                file.endsWith(".js") && !file.startsWith("__loader.js") && !file.startsWith("__exports.js"),
        );

    for (const commandFile of commandFiles) {
        let file = await import(`./${commandFile}`);
        const command: ChatInputCommand = file[commandFile.replace(".js", "")];

        if (command.type === ApplicationCommandType.ChatInput || command.type === undefined) {
            commands.push(command);
        }
    }

    return commands;
};
