import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { MessageEmbed } from "discord.js";

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
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BAN_MEMBERS"))) return;
        await interaction.deferReply();

        const query = interaction.options.get("user").value as string;
        const reason = (interaction.options.get("reason")?.value ?? "None") as string;

        try {
            const banEntries = (await interaction.guild.bans.fetch()).values();
            let unbanned = false;

            for (const banEntry of banEntries) {
                const { username, discriminator, id } = banEntry.user;

                if (query === `${username}#${discriminator}`) {
                    try {
                        const embed = new MessageEmbed({
                            description: `Successfully unbanned <@${id}>.`,
                            color: brandColor,
                        });

                        await interaction.guild.members.unban(id, `${reason} - ${interaction.user.tag}`);
                        await interaction.editReply({ embeds: [embed] });
                        unbanned = true;
                        break;
                    } catch (e: unknown) {
                        await handleError(interaction, e as Error);
                    }
                }
            }

            if (!unbanned) {
                await interaction.editReply({ content: `User \`${query}\` is not banned.` });
            }
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
