import { checkPermissions, ChatInputCommand, handleError } from "#util";

export const unmute: ChatInputCommand = {
    name: "unmute",
    description: "unmute a user",
    options: [
        {
            name: "user",
            description: "The user to unmute",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reaosn why the user should be unmuted.",
            type: "STRING",
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MODERATE_MEMBERS"))) return;

        const userId = interaction.options.get("user").user.id;

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            const member = await interaction.guild.members.fetch(userId);
            await member.timeout(null, reason);
            await interaction.reply({
                content: `Remove timeout from ${member}.`,
            });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
