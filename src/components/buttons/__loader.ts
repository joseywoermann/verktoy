import * as fs from "fs";
import { Collection } from "discord.js";
import type { Button } from "#util/types";
import { logger } from "#util/logger";

const loadButtons = async (): Promise<Button[]> => {
    const buttons: Button[] = [];
    const buttonFiles = fs
        .readdirSync(`dist/components/buttons/`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("__loader.js"));

    for (const buttonFile of buttonFiles) {
        let file = await import(`./${buttonFile}`);
        const button: Button = file[buttonFile.replace(".js", "")];
        buttons.push(button);
        logger.debug(`[DISCORD]  Found button:  ${button.data.customId ?? "<LINK-button>"}`);
    }

    return buttons;
};

export const buttons = new Collection<string, Button>(
    Object.entries(
        (await loadButtons()).reduce((all, button) => {
            return { ...all, [button.data.customId]: button };
        }, {} as Record<string, Button>)
    )
);
