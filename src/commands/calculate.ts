import { brandColor, ChatInputCommand } from "#util";
import { evaluate } from "mathjs";

export const calculate: ChatInputCommand = {
    name: "calculate",
    description: "Calculate something",
    options: [
        {
            name: "expression",
            description: "What do you want to calculate?",
            type: "STRING",
            required: true,
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const exp = interaction.options.get("expression").value as string;

        const [success, result] = calc(exp);

        if (success) {
            await interaction.reply({
                embeds: [{ title: `${result}`, description: `= ${exp}`, color: brandColor }],
            });
        } else {
            await interaction.reply({
                embeds: [
                    {
                        title: `${result}`,
                        color: "RED",
                    },
                ],
            });
        }
    },
};

/**
 * Calculates an expression. The first returned value shows whether or not the calculation was successful, the second is either the result or the error message.
 * @param expression
 * @returns `[success, result]`
 */
const calc = (expression: string): [boolean, string] => {
    try {
        const result: string = evaluate(expression);
        return [true, result];
    } catch (e: unknown) {
        return [false, e["message"]];
    }
};
