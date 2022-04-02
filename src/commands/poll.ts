import { ChatInputCommand } from "#util";
import { Message, MessageEmbed } from "discord.js";

export const poll: ChatInputCommand = {
    name: "poll",
    description: "Create a poll",
    restricted: false,
    options: [
        {
            name: "generic",
            description: "Create a generic poll and specify choices",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "question",
                    description: "What do you want to ask?",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "choice1",
                    description: "Choice number 1",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "choice2",
                    description: "Choice number 2",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "choice3",
                    description: "Choice number 3",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice4",
                    description: "Choice number 4",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice5",
                    description: "Choice number 5",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice6",
                    description: "Choice number 6",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice7",
                    description: "Choice number 7",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice8",
                    description: "Choice number 8",
                    type: "STRING",
                    required: false,
                },
                {
                    name: "choice9",
                    description: "Choice number 9",
                    type: "STRING",
                    required: false,
                },
            ],
        },
        {
            name: "yesno",
            description: "Create a simple yes/no poll",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "question",
                    description: "What do you want to ask?",
                    type: "STRING",
                    required: true,
                },
            ],
        },
    ],
    run: async (interaction) => {
        const pollType = interaction.options.getSubcommand();
        console.log(pollType);

        const question = interaction.options.get("question").value;

        // Yes / No poll
        if (pollType === "yesno") {
            const embed = new MessageEmbed({
                title: `${question}`,
                color: "#D329A0",
            });

            const msg = (await interaction.reply({ embeds: [embed], fetchReply: true })) as Message<boolean>;

            msg.react("👍");
            msg.react("👎");
            return;
        }

        // A poll with user-defined choices
        if (pollType === "generic") {
            const embed = new MessageEmbed({
                title: `${question}`,
                description: ``,
                color: "#D329A0",
            });

            // remove the question from list of choices
            const choices = interaction.options.data[0].options.filter(
                (choice) => choice.name !== "question"
            );

            // construct embed
            choices.forEach((choice, i) => {
                embed.description += `${emojis[i]}: ${choice.value}\n`;
            });

            const msg = (await interaction.reply({ embeds: [embed], fetchReply: true })) as Message<boolean>;

            // add reactions based on number of choices
            choices.forEach((_, i) => {
                msg.react(emojis[i]);
            });
            return;
        }
    },
};

const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
