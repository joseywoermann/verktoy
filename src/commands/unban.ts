import { checkPermissions, ChatInputCommand, handleError } from "#util";

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
        {
            name: "reason",
            description: "The reaosn why the user should be unmuted.",
            type: "STRING",
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BAN_MEMBERS"))) return;
        await interaction.deferReply({ ephemeral: true });

        const query = interaction.options.get("user").value as string;

        const reason = interaction.options.get("reason")?.value;

        try {
            const banEntries = (await interaction.guild.bans.fetch()).values();
            let banned = false;

            for (const banEntry of banEntries) {
                const { username, discriminator, id } = banEntry.user;

                if (query === `${username}#${discriminator}`) {
                    try {
                        await interaction.guild.members.unban(
                            id,
                            `${reason ?? "None"} - ${interaction.user.tag}`
                        );
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
