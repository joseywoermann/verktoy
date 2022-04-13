import { brandColor, ChatInputCommand, randomInteger } from "#util";
import { MessageEmbed } from "discord.js";

export const flip: ChatInputCommand = {
    name: "flip",
    description: "Flip a coin to help you decide.",
    restricted: false,
    run: async (interaction) => {
        const embed = new MessageEmbed({
            title: `${randomInteger(0, 1) === 0 ? "Front" : "Back"}`,
            color: brandColor,
        });
        await interaction.reply({ embeds: [embed] });
    },
};
