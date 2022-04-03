import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";

export const eightBall: ChatInputCommand = {
    name: "8ball",
    description: "Ask the magic 8ball",
    options: [
        {
            name: "question",
            description: "Ask a question",
            type: "STRING",
            required: true,
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const question = interaction.options.get("question").value as string;

        const answer = allResponses[Math.floor(Math.random() * allResponses.length)];

        const embed = new MessageEmbed({
            title: `${answer}`,
            description: `You asked: "${question}"`,
            color: "#D329A0",
        });

        interaction.reply({ embeds: [embed] });
    },
};

const pResponses: string[] = [
    "Yes",
    "Definitely",
    "Absolutely",
    "Most likely",
    "Certainly",
    "Probably",
    "Hell yeah",
];

const nResponses: string[] = [
    "No",
    "Definitely not",
    "Absolutely",
    "Most likely not",
    "Certainly not",
    "Probably not",
];

const allResponses: string[] = [...pResponses, ...nResponses, "Maybe", "Possibly", "Perhaps"];
