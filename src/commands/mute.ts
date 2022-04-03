import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { MessageEmbed } from "discord.js";

export const mute: ChatInputCommand = {
    name: "mute",
    description: "Mute a user for a given time",
    options: [
        {
            name: "user",
            description: "The user to mute",
            type: "USER",
            required: true,
        },
        {
            name: "duration",
            description: "The duration the user should be muted for, in minutes.", // TODO: add autocomplete with different time units
            type: "INTEGER",
            required: true,
            minValue: 1,
            maxValue: 40320, // 28 days
        },
        {
            name: "reason",
            description: "The reaosn why the user should be muted.",
            type: "STRING",
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MODERATE_MEMBERS"))) return;

        const userId = interaction.options.get("user").user.id;
        const duration = Number(interaction.options.get("duration").value);

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            const member = await interaction.guild.members.fetch(userId);
            await member.timeout(mintoMs(duration), reason);

            const embed = new MessageEmbed({
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
