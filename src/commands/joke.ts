import { brandColor, ChatInputCommand } from "#util";
import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const joke: ChatInputCommand = {
    name: "joke",
    description: "A random joke",
    restricted: false,
    run: async (interaction) => {
        const res = await fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist`);
        const data = (await res.json()) as JokeData;

        let embed = new EmbedBuilder({
            footer: { text: `Source: jokeapi.dev` },
            color: brandColor,
        });
        if (data.type === "single") {
            embed.setTitle(data.joke);
        } else {
            embed.setTitle(data.setup);
            embed.setDescription(`- ${data.delivery}`);
        }

        await interaction.reply({ embeds: [embed] });
    },
};

/**
 * The data returned by the API
 */
interface JokeData {
    error: boolean;
    category: string;
    type: "single" | "twopart";
    joke?: string;
    setup?: string;
    delivery?: string;
    flags: Flags;
    id: number;
    safe: boolean;
    lang: string;
}

/**
 * Flags
 */
interface Flags {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
}
