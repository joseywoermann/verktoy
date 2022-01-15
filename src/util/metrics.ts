import fetch from "node-fetch";
import { statisticsURL } from "#util/constants.js";
import type { Snowflake } from "discord.js";
import type { APIResponse, Metrics } from "#util/types";

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
                popular: res.data[0]?.popular,
                votes: res.data[0]?.votes,
            },
        };
    }
};
