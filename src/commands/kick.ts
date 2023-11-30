import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const kick: ChatInputCommand = {
    name: "kick",
    description: "Kick a user from the server.",
    options: [
        {
            name: "member",
            description: "The user who should be kicked",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the kick",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "KickMembers"))) return;

        const user = interaction.options.get("member").user.id;

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            await interaction.guild.members.kick(user, reason);

            const embed = new EmbedBuilder({
                description: `Successfully kicked <@${user}>.`,
                color: brandColor,
            });

            await interaction.reply({ embeds: [embed] });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
