import { CommandInteraction, ContextMenuInteraction, MessageEmbed, PermissionFlags } from "discord.js";

export const checkPermissions = async (
    interaction: CommandInteraction | ContextMenuInteraction,
    permission: keyof PermissionFlags
): Promise<boolean> => {
    if (!interaction.memberPermissions.has(permission)) {
        const embed = new MessageEmbed({
            title: "You are missing the following permission(s):",
            description: `\`\`\`\n\\${permission}\`\`\``,
            color: "RED",
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return false;
    }
    return true;
};
