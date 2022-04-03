import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { MessageEmbed, TextChannel } from "discord.js";

export const slowmode: ChatInputCommand = {
    name: "slowmode",
    description: "Enable slowmode in this channel",
    options: [
        {
            name: "delay",
            description: "How many seconds the users have to wait before sending messages, 0 to remove it",
            type: "INTEGER",
            required: true,
            maxValue: 21600,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MANAGE_CHANNELS"))) return;
        const delay = Number(interaction.options.get("delay").value);

        try {
            const embed = new MessageEmbed({
                description: `Successfully set slowmode to ${delay} seconds.`,
                color: brandColor,
            });

            await (interaction.channel as TextChannel).setRateLimitPerUser(delay);
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            await handleError(interaction, e as Error);
        }
    },
};
