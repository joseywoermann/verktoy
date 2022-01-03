import { checkPermissions } from "../util/checkPermissions.js";
import { handleError } from "../util/errorHandler.js";
import type { ChatInputCommand } from "../util/types";

export const unban: ChatInputCommand = {
    name: "unban",
    description: "Unban a user from the server.",
    options: [
        {
            name: "user",
            description: "The user who should be unbanned",
            type: "STRING",
            required: true,
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BAN_MEMBERS"))) return;
        await interaction.deferReply({ ephemeral: true });

        const query = interaction.options.get("user").value as string;

        try {
            const bannedUsers = (await interaction.guild.bans.fetch()).values();
            let banned = false;

            for (const entry of bannedUsers) {
                const { username, discriminator, id } = entry.user;

                if (query === `${username}#${discriminator}`) {
                    try {
                        await interaction.guild.members.unban(id);
                        await interaction.editReply({ content: `Successfully unbanned <@${id}>.` });
                        banned = true;
                        break;
                    } catch (e: unknown) {
                        await handleError(interaction, e as Error);
                    }
                }
            }
            if (!banned) {
                await interaction.editReply({ content: `User \`${query}\` is not banned.` });
            }
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
