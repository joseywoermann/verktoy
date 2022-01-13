import fetch from "node-fetch";

/**
 * Retrieve data from `some-random-api.ml`.
 * @param path
 * @param key
 * @param query
 * @returns
 */
export const get = async <T>(path: string, key?: string, query?: string): Promise<T | APIError> => {
    const q = encodeURIComponent(query);
    const res = await fetch(`https://some-random-api.ml/${path}?${key}=${q}`);
    const data = (await res.json()) as T;
    if (data["error"]) return data["error"] as APIError;
    return data;
};

type APIError = string;
