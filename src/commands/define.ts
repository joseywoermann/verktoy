import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { ChatInputCommand } from "../util/types";

export const define: ChatInputCommand = {
    name: "define",
    description: "Look up a definition of a word on urbandictionary.com",
    options: [
        {
            name: "word",
            description: "The word to define",
            type: "STRING",
            required: true,
        },
    ],
    run: async (interaction) => {
        const word = interaction.options.get("word").value.toString();
        const definition = await getDefinitions(word);

        if (!definition) {
            const embed = new MessageEmbed({ title: `No definition found for "${word}"` });
            await interaction.reply({ embeds: [embed] });
            return;
        }

        const embed = new MessageEmbed({
            title: definition.word,
            description: `${definition.definition}`,
            footer: {
                text: `Definition by ${definition.author} | ${definition.thumbs_up} upvotes, ${definition.thumbs_down} downvotes`,
            },
            author: {
                name: `Definitions powered by urbandictionary.com`,
                url: definition.permalink,
            },
            timestamp: new Date(definition.written_on),
        });

        await interaction.reply({ embeds: [embed] });
    },
};

const getDefinitions = async (query: string): Promise<Definition> => {
    const url = `https://api.urbandictionary.com/v0/define?term=${query}`;
    const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`);
    const resData = (await res.json()) as APIResponse;
    return resData.list[0];
};

interface APIResponse {
    list: Definition[];
}

interface Definition {
    definition: string;
    permalink: string;
    thumbs_up: number;
    sound_urls: any[];
    author: string;
    word: string;
    defid: number;
    current_vote: string;
    written_on: string;
    example: string;
    thumbs_down: number;
}
