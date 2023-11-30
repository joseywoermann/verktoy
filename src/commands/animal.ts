import { brandColor, ChatInputCommand, logger } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import fetch from "node-fetch";

export const animal: ChatInputCommand = {
    name: "animal",
    description: "Photos of cute animals",
    options: [
        {
            name: "species",
            description: "Select a species",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "Bird", value: "bird" },
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

        logger.debug(species)

        // website doesn't have content

        const res = await fetch(`https://some-random-api.ml/animal/${species}`);
        const data = (await res.json()) as { image: string, fact: string };

        const embed = new EmbedBuilder({
            title: `Here is a picture of a ${species === "red_panda" ? "red panda" : species}!`,
            image: { url: data.image },
            footer: { text: `Source: some-random-api.ml` },
            color: brandColor,
        });

        await interaction.reply({ embeds: [embed] });
    },
};