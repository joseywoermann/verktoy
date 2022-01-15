import { checkPermissions } from "#util/checkPermissions.js";
import { handleError } from "#util/errorHandler.js";
import { ChatInputCommand } from "#util/types";

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
        },
        {
            name: "reason",
            description: "The reaosn why the user should be muted.",
            type: "STRING",
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MODERATE_MEMBERS"))) return;

        const userId = interaction.options.get("user").user.id;
        const duration = Number(interaction.options.get("duration").value);

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            const member = await interaction.guild.members.fetch(userId);
            await member.timeout(minutesToMS(duration), reason);
            await interaction.reply({
                content: `Timed out ${member} for ${duration} ${duration === 1 ? "minute" : "minutes"}.`,
            });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};

const minutesToMS = (minutes: number): number => minutes * 60 * 1000;
