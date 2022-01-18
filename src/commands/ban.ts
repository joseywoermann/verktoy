import { checkPermissions, ChatInputCommand, handleError } from "#util";

export const ban: ChatInputCommand = {
    name: "ban",
    description: "Ban a user from the server.",
    options: [
        {
            name: "user",
            description: "user",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "member",
                    description: "The user who should be banned",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the ban",
                    type: "STRING",
                    required: false,
                },
            ],
        },
        {
            name: "id",
            description: "id",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "member",
                    description: "The user who should be banned",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the ban",
                    type: "STRING",
                    required: false,
                },
            ],
        },
    ],
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BAN_MEMBERS"))) return;

        const method = interaction.options.getSubcommand();

        const reason = interaction.options.get("reason")?.value;
        const target = interaction.options.get("member");

        const user = method === "user" ? target?.user.id : target?.value.toString();

        try {
            await interaction.guild.members.ban(user, {
                reason: `${reason ?? "None"} - ${interaction.user.tag}`,
            });
            await interaction.reply({ content: `Successfully banned <@${user}>.` });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
