import * as fs from "fs";
import { Collection } from "discord.js";
import { Button, logger } from "#util";

const loadButtons = async (): Promise<Button[]> => {
    const buttons: Button[] = [];
    const buttonFiles = fs
        .readdirSync(`dist/components/buttons/`)
        .filter(
            (file) =>
                file.endsWith(".js") && !file.startsWith("__loader.js") && !file.startsWith("__exports.js")
        );

    for (const buttonFile of buttonFiles) {
        let file = await import(`./${buttonFile}`);
        const button: Button = file[buttonFile.replace(".js", "")];
        buttons.push(button);
        logger.debug(`[DISCORD]  Found button:  ${String(button.data) ?? "<LINK-button>"}`);
    }

    return buttons;
};

export const buttons = new Collection<string, Button>(
    Object.entries(
        (await loadButtons()).reduce((all, button) => {
            return { ...all, [String(button.data)]: button };
        }, {} as Record<string, Button>)
    )
);
