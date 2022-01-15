import * as fs from "fs";
import { Collection } from "discord.js";
import type { Command } from "#util/types";
import { logger } from "#util/logger";

const loadCommands = async (): Promise<Command[]> => {
    const commands: Command[] = [];
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("__loader.js"));

    for (const commandFile of commandFiles) {
        let file = await import(`./${commandFile}`);
        const command: Command = file[commandFile.replace(".js", "")];
        commands.push(command);
        logger.debug(`[DISCORD]  Found command: ${command.name}`);
    }

    return commands;
};

export const commands = new Collection<string, Command>(
    Object.entries(
        (await loadCommands()).reduce((all, command) => {
            return { ...all, [command.name]: command };
        }, {} as Record<string, Command>)
    )
);
