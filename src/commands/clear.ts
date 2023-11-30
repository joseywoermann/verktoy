import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { ChannelType, EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const clear: ChatInputCommand = {
    name: "clear",
    description: "Bulk delete messages in this channel",
    options: [
        {
            name: "limit",
            description: "The number of messages to delete",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "ManageMessages"))) return;

        await interaction.deferReply({ ephemeral: true });

        try {
            const limit = (interaction.options.get("limit")?.value as number) ?? 1;

            // if (interaction.channel.type !== ChannelType.DM) {
                const n = (await interaction.channel.bulkDelete(limit)).size;

                const embed = new EmbedBuilder({
                    description: `Deleted ${n} ${n > 1 ? "messages" : "message"}.`,
                    color: brandColor,
                });

                await interaction.editReply({ embeds: [embed] });
            // }
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
