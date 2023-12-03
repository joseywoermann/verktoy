import { CommandInteraction, ContextMenuCommandInteraction, EmbedBuilder, PermissionFlags, Colors } from "discord.js";

/**
 * Checks whether the use who ran the command has the required permissions and responds with an error message if that's not the case.
 * @param interaction
 * @param permission
 * @returns
 */
export const checkPermissions = async (
    interaction: CommandInteraction | ContextMenuCommandInteraction,
    permission: keyof PermissionFlags
): Promise<boolean> => {
    if (!interaction.memberPermissions.has(permission)) {
        const embed = new EmbedBuilder({
            title: "You are missing the following permission(s):",
            description: `\`\`\`\n\\${String(permission)}\`\`\``,
            color: Colors.Red,
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return false;
    }
    return true;
};
