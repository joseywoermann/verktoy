export const formatDuration = async (ms: number): Promise<string> => {
    if (ms < 0) return "0";
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
    };
    const formatted = Object.entries(time)
        .filter((val) => val[1] !== 0)
        .map((val) => `${val[1]} ${val[1] !== 1 ? `${val[0]}s` : val[0]}`)
        .join(", ");
    return formatted;
};
