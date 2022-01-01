import * as fs from "fs";
import { Collection } from "discord.js";
import type { Select } from "../../util/types";
import { logger } from "../../util/logger.js";

// Load all selects in the selects/ directory
const loadSelects = async (): Promise<Select[]> => {
    const selectsData: Select[] = [];
    const selectFiles = fs
        .readdirSync(`dist/components/selects/`)
        .filter((file) => file.endsWith(".js") && !file.startsWith("loader.js"));

    for (const file of selectFiles) {
        let select = await import(`./${file}`);
        selectsData.push(select[file.replace(".js", "")]);
        logger.debug(`[DISCORD]  Found select:  ${select[file.replace(".js", "")].data.customId}`);
    }

    return selectsData;
};

export const selects = new Collection<string, Select>(
    Object.entries(
        (await loadSelects()).reduce((all, select) => {
            return { ...all, [select.data.customId]: select };
        }, {} as Record<string, Select>)
    )
);
