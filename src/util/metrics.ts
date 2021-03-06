import fetch from "node-fetch";
import { statisticsURL } from "#util";
import type { Snowflake } from "discord.js";

/**
 * Fetch metrics from the API and parse them
 * @param clientId
 * @returns
 */
export const fetchMetrics = async (clientId: Snowflake): Promise<Metrics> => {
    const res = (await (await fetch(`${statisticsURL}/${clientId}`)).json()) as APIResponse;

    if (!res.data) {
        return {
            error: { occured: res.error, message: res.message },
            metrics: null,
        };
    } else {
        return {
            error: { occured: res.error, message: null },
            metrics: {
                time: res.data[0]?.time,
                servers: res.data[0]?.servers,
                users: res.data[0]?.users,
                commands: res.data[0]?.commands,
                active: res.data[0]?.active,
                memactive: res.data[0]?.memactive,
                memload: res.data[0]?.memload,
                count: res.data[0]?.count,
                popular: res.popular,
                votes: res.data[0]?.votes,
            },
        };
    }
};

/**
 * Raw response from the Statcord-API
 */
interface APIResponse {
    error: boolean;
    message?: string;
    data?: RawMetrics[];
    popular?: Popular[];
}

/**
 * Raw metrics
 */
interface RawMetrics {
    time: number;
    servers: string;
    users: string;
    commands: string;
    active: string;
    custom1: string;
    custom2: string;
    memactive: string;
    memload: string;
    bandwidth: string;
    cpuload: string;
    count: number;
    popular: Popular[];
    votes: number;
}

interface Popular {
    name: string;
    count: string;
}

// we don't need those keys
type StrippedMetrics = Omit<RawMetrics, "custom1" | "custom2" | "bandwidth" | "cpuload">;

interface Metrics {
    error: { occured: boolean; message?: string };
    metrics?: StrippedMetrics;
}
