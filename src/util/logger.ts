import Logger from "@josey/logger";
import { isDev } from "#util/constants";

export const logger = new Logger({
    timezone: "UTC",
    output: isDev ? { type: "console" } : { type: "file", file: "./output.log" },
});
