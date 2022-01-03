import { checkPermissions } from "../util/checkPermissions.js";
import { handleError } from "../util/errorHandler.js";
import { ChatInputCommand } from "../util/types";

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
            description: "The duration the user should be mutet.",
            type: "INTEGER",
            required: true,
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MODERATE_MEMBERS"))) return;

        const userId = interaction.options.get("user").user.id;
        const duration = Number(interaction.options.get("duration").value);
        try {
            const member = await interaction.guild.members.fetch(userId);
            await member.timeout(duration * 60 * 1000);
            await interaction.reply({
                content: `Timed out ${member} for ${duration} ${duration === 1 ? "minute" : "minutes"}.`,
            });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
