import * as fs from "fs";
import { Collection } from "discord.js";
import type { Command } from "#util/types";
import { logger } from "#util/logger";

const loadCommands = async (): Promise<Command[]> => {
    const commandsData: Command[] = [];
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("__loader.js"));

    for (const file of commandFiles) {
        let command = await import(`./${file}`);
        const data: Command = command[file.replace(".js", "")];
        commandsData.push(data);
        logger.debug(`[DISCORD]  Found command: ${data.name}`);
    }

    return commandsData;
};

export const commands = new Collection<string, Command>(
    Object.entries(
        (await loadCommands()).reduce((all, command) => {
            return { ...all, [command.name]: command };
        }, {} as Record<string, Command>)
    )
);
