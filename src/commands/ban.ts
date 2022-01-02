import { MessageEmbed, Snowflake } from "discord.js";
import { handleError } from "../util/errorHandler.js";
import type { ChatInputCommand } from "../util/types";

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
        if (!interaction.memberPermissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed({
                title: "You are missing the following permission(s):",
                description: `\`\`\`\nBAN_MEMBERS\`\`\``,
                color: "RED",
            });

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        let user: Snowflake;
        const reason = interaction.options.get("reason")?.value ?? "No reason provided";

        if (interaction.options.getSubcommand() === "user") {
            user = interaction.options.get("member").user.id;
        } else if (interaction.options.getSubcommand() === "id") {
            user = interaction.options.get("member")?.value as Snowflake;
        }

        try {
            await interaction.guild.members.ban(user, {
                reason: reason as string,
            });
            await interaction.reply({ content: `Successfully banned <@${user}>.` });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
