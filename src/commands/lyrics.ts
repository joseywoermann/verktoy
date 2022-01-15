import { MessageEmbed } from "discord.js";
import { get } from "#util/modules/SomeRandomAPI";
import { ChatInputCommand } from "#util/types";

export const lyrics: ChatInputCommand = {
    name: "lyrics",
    description: "Show lyrics for a song",
    options: [
        {
            name: "song",
            description: "The sond",
            type: "STRING",
            required: true,
        },
    ],
    run: async (interaction) => {
        const title = interaction.options.get("song").value.toString();

        const data = await get<Lyrics>("lyrics", "title", title);

        if (typeof data !== "string") {
            const embed = new MessageEmbed({
                title: `${data.title} by ${data.author}`,
                description: data.lyrics,
                thumbnail: { url: data.thumbnail.genius },
                footer: { text: `lyrics provided by genius.com` },
            });
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: `No lyrics found for ${data}.` });
        }
    },
};

interface Lyrics {
    title: string;
    author: string;
    lyrics: string;
    thumbnail: { genius: string };
    links: { genius: string };
    disclaimer: string;
}
