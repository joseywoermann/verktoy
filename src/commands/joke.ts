import { brandColor, ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export const joke: ChatInputCommand = {
    name: "joke",
    description: "A random joke",
    restricted: false,
    run: async (interaction) => {
        const res = await fetch("https://some-random-api.ml/joke");
        const data = (await res.json()) as { joke: string };

        const embed = new MessageEmbed({
            title: `${data.joke}`,
            footer: { text: `Source: some-random-api.ml` },
            color: brandColor,
        });

        await interaction.reply({ embeds: [embed] });
    },
};
