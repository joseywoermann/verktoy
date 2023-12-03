import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const mute: ChatInputCommand = {
    name: "mute",
    description: "Mute a user for a given time",
    options: [
        {
            name: "user",
            description: "The user to mute",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "duration",
            description: "The duration the user should be muted for, in minutes.", // TODO: add autocomplete with different time units
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 1,
            maxValue: 40320, // 28 days
        },
        {
            name: "reason",
            description: "The reaosn why the user should be muted.",
            type: ApplicationCommandOptionType.String,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "ModerateMembers"))) return;

        const userId = interaction.options.get("user").user.id;
        const duration = Number(interaction.options.get("duration").value);

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            const member = await interaction.guild.members.fetch(userId);
            await member.timeout(mintoMs(duration), reason);

            const embed = new EmbedBuilder({
                description: `Timed out ${member} for ${duration} ${duration === 1 ? "minute" : "minutes"}.`,
                color: brandColor,
            });

            await interaction.reply({ embeds: [embed] });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};

const mintoMs = (minutes: number): number => minutes * 60 * 1000;
