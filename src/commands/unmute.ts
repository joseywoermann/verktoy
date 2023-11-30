import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const unmute: ChatInputCommand = {
    name: "unmute",
    description: "unmute a user",
    options: [
        {
            name: "user",
            description: "The user to unmute",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "reason",
            description: "The reaosn why the user should be unmuted.",
            type: ApplicationCommandOptionType.String,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "ModerateMembers"))) return;

        const userId = interaction.options.get("user").user.id;

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            const member = await interaction.guild.members.fetch(userId);
            const embed = new EmbedBuilder({
                description: `Removed timeout from ${member}.`,
                color: brandColor,
            });

            await member.timeout(null, reason);
            await interaction.reply({ embeds: [embed] });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
