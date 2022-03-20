import { checkPermissions, ChatInputCommand, handleError } from "#util";

export const kick: ChatInputCommand = {
    name: "kick",
    description: "Kick a user from the server.",
    options: [
        {
            name: "member",
            description: "The user who should be kicked",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the kick",
            type: "STRING",
            required: false,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "KICK_MEMBERS"))) return;

        const user = interaction.options.get("member").user.id;

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        try {
            await interaction.guild.members.kick(user, reason);
            await interaction.reply({ content: `Successfully kicked <@${user}>.` });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
