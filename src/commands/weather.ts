import { EmbedBuilder, ApplicationCommandOptionType, Colors } from "discord.js";
import fetch from "node-fetch";
import { brandColor, ChatInputCommand, handleError, logger } from "#util";

export const weather: ChatInputCommand = {
    name: "weather",
    description: "View the weather for a given location",
    options: [
        {
            name: "location",
            description: "The city / place",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    restricted: false,
    run: async (interaction) => {
        await interaction.deferReply();
        const loc = interaction.options.get("location").value as string;

        const rawData = await (await fetch(`https://wttr.in/${loc}`)).text();

        try {
            if (!rawData.startsWith("Weather report:")) {
                const embed = new EmbedBuilder({
                    title: "Error",
                    description: `\`\`\`\nCould not find location "${loc}".\`\`\``,
                    color: Colors.Red,
                });

                await interaction.editReply({ embeds: [embed] });
            } else {
                const tldr = rawData.split("┌")[0];

                const location = `${rawData.split("Location: ")[1].split("]")[0]}]`;

                const embed = new EmbedBuilder({
                    description: block(tldr, "ansi"),
                    footer: { text: location },
                    color: brandColor,
                });

                await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            await handleError(interaction, error);
        }
    },
};

/**
 * Make code block thing
 * @param text
 * @returns
 */
const block = (text: string, lang: string) => `\`\`\`${lang}\n${text}\`\`\``;
