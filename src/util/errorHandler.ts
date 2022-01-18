import {
    CommandInteraction,
    ContextMenuInteraction,
    MessageComponentInteraction,
    MessageEmbed,
} from "discord.js";
import { logger } from "#util";

/**
 * Log the error to the console and reply to the interaction with a nice embed.
 * @param interaction
 * @param error
 */
export const handleError = async (
    interaction: CommandInteraction | ContextMenuInteraction | MessageComponentInteraction,
    error: Error
): Promise<void> => {
    logger.warn(`[DISCORD]  ${error}`);

    const embed = new MessageEmbed({
        title: "An error occured:",
        description: `\`\`\`\n${error}\`\`\``,
        color: "RED",
    });

    if (interaction.deferred) {
        await interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
