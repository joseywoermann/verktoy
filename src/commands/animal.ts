import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export const animal: ChatInputCommand = {
    name: "animal",
    description: "Photos of cute animals",
    options: [
        {
            name: "species",
            description: "Select a species",
            type: "STRING",
            required: true,
            choices: [
                { name: "Bird", value: "birb" },
                { name: "Cat", value: "cat" },
                { name: "Dog", value: "dog" },
                { name: "Fox", value: "fox" },
                { name: "Koala", value: "koala" },
                { name: "Panda", value: "panda" },
                { name: "Red Panda", value: "red_panda" },
            ],
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const species = interaction.options.get("species").value as string;

        const res = await fetch(`https://some-random-api.ml/img/${species}`);
        const data = (await res.json()) as { link: string };

        const embed = new MessageEmbed({
            title: `Here is a picture of a ${species === "red_panda" ? "red panda" : species}!`,
            image: { url: data.link },
            footer: { text: `Source: some-random-api.ml` },
            color: "#D329A0",
        });

        await interaction.reply({ embeds: [embed] });
    },
};
