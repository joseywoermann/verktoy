import * as fs from "fs";
import { Collection } from "discord.js";
import type { Select } from "#util/types";
import { logger } from "#util/logger";

const loadSelects = async (): Promise<Select[]> => {
    const selects: Select[] = [];
    const selectFiles = fs
        .readdirSync(`dist/components/selects/`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("__loader.js"));

    for (const selectFile of selectFiles) {
        let file = await import(`./${selectFile}`);
        const select: Select = file[selectFile.replace(".js", "")];
        selects.push(select);
        logger.debug(`[DISCORD]  Found select:  ${select.data.customId}`);
    }

    return selects;
};

export const selects = new Collection<string, Select>(
    Object.entries(
        (await loadSelects()).reduce((all, select) => {
            return { ...all, [select.data.customId]: select };
        }, {} as Record<string, Select>)
    )
);
