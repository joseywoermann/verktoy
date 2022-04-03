import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";

export const rps: ChatInputCommand = {
    name: "rps",
    description: "Play a round of Rock Paper Scissors",
    options: [
        {
            name: "selection",
            description: "What do you choose?",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Rock",
                    value: "rock",
                },
                {
                    name: "Paper",
                    value: "paper",
                },
                {
                    name: "Scissors",
                    value: "scissors",
                },
            ],
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const userChoice = interaction.options.get("selection").value as RPSChoice;
        const botChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)] as RPSChoice;

        const winner = await determineWinner(userChoice, botChoice);
        const result = winner === "draw" ? "It's a draw!" : `You ${winner === "user" ? "won" : "lost"}!`;

        const embed = new MessageEmbed({
            title: result,
            description: `You selected **${userChoice}**, the bot chose **${botChoice}**.`,
            color: "#D329A0",
            thumbnail: { url: await getImage(userChoice) },
        });

        if (winner !== "draw") {
            const wThing = winner === "user" ? userChoice : botChoice;
            const lThing = winner === "user" ? botChoice : userChoice;

            embed.description += `\n**${wThing}** ${wThing === "scissors" ? "beat" : "beats"} **${lThing}**`;
        }

        interaction.reply({ embeds: [embed] });
    },
};

/**
 * Decide whether the match results in a draw and - if it didn't - who won the match.
 * @param userChoice The option the user selected
 * @param botChoice The option the bot selected
 * @returns `"draw" | "user" | "bot"`
 */
const determineWinner = async (userChoice: RPSChoice, botChoice: RPSChoice): Promise<Winner> => {
    if (userChoice === botChoice) return "draw";

    if (userChoice === "rock" && botChoice === "scissors") return "user";
    if (userChoice === "paper" && botChoice === "rock") return "user";
    if (userChoice === "scissors" && botChoice === "paper") return "user";

    return "bot";
};

const getImage = async (userChoice: RPSChoice): Promise<string> => {
    if (userChoice === "rock") {
        return "https://raw.githubusercontent.com/joseywoermann/verktoy/master/assets/rps/rock.png";
    } else if (userChoice === "paper") {
        return "https://raw.githubusercontent.com/joseywoermann/verktoy/master/assets/rps/paper.png";
    } else if (userChoice === "scissors") {
        return "https://raw.githubusercontent.com/joseywoermann/verktoy/master/assets/rps/scissors.png";
    }
};

type RPSChoice = "rock" | "paper" | "scissors";
type Winner = "draw" | "user" | "bot";
