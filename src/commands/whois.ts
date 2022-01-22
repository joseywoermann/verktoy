import { ChatInputCommand, handleError } from "#util";
import { getUserInfo } from "#util";

export const whois: ChatInputCommand = {
    name: "whois",
    description: "Show information about a user",
    options: [
        {
            name: "user",
            description: "The user",
            type: "USER",
        },
    ],
    run: async (interaction) => {
        try {
            const user = interaction.options.get("user")?.user ?? interaction.user;
            const embed = await getUserInfo(interaction, user);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await handleError(interaction, error);
        }
    },
};
