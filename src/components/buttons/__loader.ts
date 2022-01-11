import * as fs from "fs";
import { Collection } from "discord.js";
import type { Button } from "../../util/types";
import { logger } from "../../util/logger.js";

// Load all buttons in the button/ directory
const loadButtons = async (): Promise<Button[]> => {
    const buttonsData: Button[] = [];
    const buttonFiles = fs
        .readdirSync(`dist/components/buttons/`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("__loader.js"));

    for (const file of buttonFiles) {
        let button = await import(`./${file}`);
        buttonsData.push(button[file.replace(".js", "")]);
        logger.debug(
            `[DISCORD]  Found button:  ${button[file.replace(".js", "")].data.customId ?? "<LINK-button>"}`
        );
    }

    return buttonsData;
};

export const buttons = new Collection<string, Button>(
    Object.entries(
        (await loadButtons()).reduce((all, button) => {
            return { ...all, [button.data.customId]: button };
        }, {} as Record<string, Button>)
    )
);
