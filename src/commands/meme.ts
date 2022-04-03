import { brandColor, ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

// TODO: add possibility to specify subreddit
// https://github.com/D3vd/Meme_Api#specify-subreddit
export const meme: ChatInputCommand = {
    name: "meme",
    description: "Show a random meme from Reddit",
    restricted: false,
    run: async (interaction) => {
        const data = await getMeme();

        const embed = new MessageEmbed({
            title: `${data.title} (${data.subreddit})`,
            image: { url: `${data.url}` },
            footer: { text: `Source: ${data.postLink} | by ${data.author} | ${data.ups} upvotes` },
            color: brandColor,
        });

        await interaction.reply({ embeds: [embed] });
    },
};

const getMeme = async (): Promise<Meme> => {
    const res = await fetch("https://meme-api.herokuapp.com/gimme");
    const data = (await res.json()) as Meme;

    // TODO: don't post NSFW memes
    //
    // if (data.nsfw) {
    //     console.log("Meme is NSFW, reloading");
    //     await getMeme();
    // } else {
    //     return data;
    // }
    return data;
};

interface Meme {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}
