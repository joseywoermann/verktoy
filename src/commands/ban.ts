import { Snowflake } from "discord.js";
import { checkPermissions } from "#util/checkPermissions";
import { handleError } from "#util/errorHandler";
import type { ChatInputCommand } from "#util/types";

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

        let user: Snowflake;

        const rawReason = interaction.options.get("reason")?.value;
        const reason = `${rawReason ?? "None"} - ${interaction.user.tag}`;

        if (interaction.options.getSubcommand() === "user") {
            user = interaction.options.get("member")?.user.id;
        } else if (interaction.options.getSubcommand() === "id") {
            user = interaction.options.get("member")?.value.toString();
        }

        try {
            await interaction.guild.members.ban(user, { reason: reason });
            await interaction.reply({ content: `Successfully banned <@${user}>.` });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
