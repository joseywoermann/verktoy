import * as fs from "fs";
import { MessageEmbed } from "discord.js";
import { ChatInputCommand, Command } from "#util";

export const help: ChatInputCommand = {
    name: "help",
    description: "Show a list of all commands & what they do.",
    run: async (i) => {
        const cmds = await listCommands();

        const embed = new MessageEmbed({
            title: "Available commands:",
            description: `These are all the available commands. Some of them require elevated permissions, but most are open to all users.\n`,
            color: "#D329A0",
            footer: { text: "Additional functionality is provided through context menus" },
        });

        embed.description += "```\n";

        cmds.forEach((cmd) => {
            embed.description += `/${cmd.name}: ${cmd["description"]}\n`;
        });

        embed.description += "```";

        await i.reply({ embeds: [embed] });
    },
};

const listCommands = async (): Promise<Command[]> => {
    const commands: Command[] = [];
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter(
            (file) =>
                file.endsWith(".js") && !file.startsWith("__loader.js") && !file.startsWith("__exports.js")
        );

    for (const commandFile of commandFiles) {
        let file = await import(`./${commandFile}`);
        const command: Command = file[commandFile.replace(".js", "")];

        if (command.type === "CHAT_INPUT" || command.type === undefined) {
            commands.push(command);
        }
    }

    return commands;
};
