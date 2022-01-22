import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { ChatInputCommand } from "#util";

export const define: ChatInputCommand = {
    name: "define",
    description: "Look up a definition of a word on urbandictionary.com",
    options: [
        {
            name: "slang",
            description: "Use urbandictionary.com",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "word",
                    description: "The word to define",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "official",
            description: "Use an official dictionary",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "word",
                    description: "The word to define",
                    type: "STRING",
                    required: true,
                },
            ],
        },
    ],
    run: async (interaction) => {
        await interaction.deferReply();
        const word = interaction.options.get("word").value.toString();

        if (interaction.options.getSubcommand() === "slang") {
            const def = (await getDefinitions(word, "slang")) as SlangDefinition;

            if (!def) {
                const embed = new MessageEmbed({
                    title: `No definition found for "${word}"`,
                    color: "#D329A0",
                });
                await interaction.editReply({ embeds: [embed] });
                return;
            }

            const embed = new MessageEmbed({
                title: def.word,
                description: `${def.definition}`,
                color: "#D329A0",
                footer: {
                    text: `Source: urbandictionary.com | by ${def.author} | ${def.thumbs_up} upvotes, ${def.thumbs_down} downvotes`,
                },
            });

            await interaction.editReply({ embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "official") {
            const def = (await getDefinitions(word, "official")) as OfficialDefinitionEntry;

            if (!def) {
                const embed = new MessageEmbed({
                    title: `No definition found for "${word}"`,
                    color: "#D329A0",
                });
                await interaction.editReply({ embeds: [embed] });
                return;
            }

            const defFields: { name: string; value: string }[] = [];

            def.meanings.forEach((meaning) => {
                defFields.push({
                    name: `Type: ${meaning.partOfSpeech}`,
                    value: `Definition: ${meaning.definitions[0].definition}`,
                });
            });

            const embed = new MessageEmbed({
                title: def.word,
                fields: defFields,
                footer: { text: `Source: dictionaryapi.dev` },
                color: "#D329A0",
            });

            await interaction.editReply({ embeds: [embed] });
        }
    },
};

const getDefinitions = async (
    query: string,
    type: "slang" | "official"
): Promise<SlangDefinition | OfficialDefinitionEntry> => {
    if (type === "slang") {
        const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`);
        const resData = (await res.json()) as SlangAPIResponse;
        return resData.list[0];
    } else {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        const resData = (await res.json()) as OfficialDefinitionEntry[];
        return resData[0];
    }
};

export interface OfficialDefinitionEntry {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    origin: string;
    meanings: Meaning[];
}
export interface Phonetic {
    text: string;
    audio?: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

export interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: any[];
}

// slang stuff
interface SlangAPIResponse {
    list: SlangDefinition[];
}

interface SlangDefinition {
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
