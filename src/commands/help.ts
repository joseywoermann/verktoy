import * as fs from "fs";
import { MessageEmbed } from "discord.js";
import { ChatInputCommand } from "#util";

export const help: ChatInputCommand = {
    name: "help",
    description: "Show a list of all commands & what they do.",
    restricted: false,
    run: async (i) => {
        const commands = await listCommands();

        const embed = new MessageEmbed({
            title: "Available commands:",
            description: `These are all the available commands.\n**Commands marked with an** \`[X]\` **are restricted and require elevated permissions.**\n`,
            color: "#D329A0",
            footer: { text: "Additional functionality is provided through context menus" },
        });

        embed.description += "```\n";

        commands.forEach((cmd) => {
            embed.description += `${cmd.restricted ? "[X] " : "[ ] "}/${cmd.name}: ${cmd.description}\n`;
        });

        embed.description += "```";

        await i.reply({ embeds: [embed] });
    },
};

const listCommands = async (): Promise<ChatInputCommand[]> => {
    const commands: ChatInputCommand[] = [];
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter(
            (file) =>
                file.endsWith(".js") && !file.startsWith("__loader.js") && !file.startsWith("__exports.js")
        );

    for (const commandFile of commandFiles) {
        let file = await import(`./${commandFile}`);
        const command: ChatInputCommand = file[commandFile.replace(".js", "")];

        if (command.type === "CHAT_INPUT" || command.type === undefined) {
            commands.push(command);
        }
    }

    return commands;
};
