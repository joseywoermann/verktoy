import { checkPermissions } from "#util/checkPermissions";
import { handleError } from "#util/errorHandler";
import type { ChatInputCommand } from "#util/types";

export const clear: ChatInputCommand = {
    name: "clear",
    description: "Bulk delete messages in this channel",
    options: [
        {
            name: "limit",
            description: "The number of messages to delete",
            type: "INTEGER",
            minValue: 1,
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MANAGE_MESSAGES"))) return;

        await interaction.deferReply({ ephemeral: true });

        try {
            const limit = (interaction.options.get("limit")?.value as number) ?? 1;

            if (interaction.channel.type !== "DM") {
                const n = (await interaction.channel.bulkDelete(limit)).size;

                await interaction.editReply({
                    content: `Deleted ${n} ${n > 1 ? "messages" : "message"}.`,
                });
            }
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
