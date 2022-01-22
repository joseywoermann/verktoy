import { getUserInfo, handleError, UserContextCommand } from "#util";

export const userinfo: UserContextCommand = {
    name: "Show user info",
    type: "USER",
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
