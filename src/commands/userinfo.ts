import { getUserInfo, handleError, UserContextCommand } from "#util";
import { ApplicationCommandType } from "discord.js"

export const userinfo: UserContextCommand = {
    name: "Show user info",
    type: ApplicationCommandType.User,
    run: async (interaction) => {
        try {
            const user = interaction.options.get("user")?.user;
            const embed = await getUserInfo(interaction, user);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await handleError(interaction, error);
        }
    },
};
