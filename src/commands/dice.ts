import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";
import { randomInt } from "mathjs";

export const dice: ChatInputCommand = {
    name: "roll",
    description: "Roll a dice",
    type: "CHAT_INPUT",
    options: [
        {
            name: "min",
            description: "Minimum value",
            type: "INTEGER",
        },
        {
            name: "max",
            description: "Maximum value",
            type: "INTEGER",
        },
    ],
    run: async (i) => {
        // allow custom ranges
        const options = {
            min: Number(i.options.get("min")?.value ?? 1),
            max: Number(i.options.get("max")?.value ?? 6),
        };

        const number = randomInt(options.min, options.max + 1);

        const embed = new MessageEmbed({
            title: `You rolled ${number}!`,
            footer: { text: `Range: ${options.min} - ${options.max}` },
            color: "#D329A0",
        });

        await i.reply({ embeds: [embed] });
    },
};
