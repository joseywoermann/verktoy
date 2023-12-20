import type { User } from "discord.js";
import { CustomClient } from "./modules/Client";
import { formatDuration, ownerID } from "#util";

/**
 * gathers metrics and returns them in a unified object
 * @param client
 * @returns
 */
export const getMetrics = async (client: CustomClient): Promise<MetricsV2> => {
    const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toString();

    const metrics = {
        uptime: await formatDuration(client.uptime),
        userCount: client.users.cache.size,
        serverCount: client.guilds.cache.size,
        channelCount: client.channels.cache.size,
        commandExec: null,
        popularCommand: null,
        owner: {
            user: (await client.users.fetch(ownerID)) as User,
        },
        memoryLoad: mem.slice(0, mem.length - 12),
        cpuLoad: null,
    };

    return metrics;
};

/**
 * Metrics V2
 */
interface MetricsV2 {
    uptime: string;
    userCount: number;
    serverCount: number;
    channelCount: number;
    commandExec: number | null;
    popularCommand: {
        name: string;
        runs: number;
    } | null;
    owner: Owner;
    memoryLoad: string;
    cpuLoad: number | null;
}

interface Owner {
    user: User;
}
