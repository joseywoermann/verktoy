import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { MessageEmbed } from "discord.js";

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
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BAN_MEMBERS"))) return;

        const method = interaction.options.getSubcommand();

        const reason = interaction.options.get("reason")?.value ?? "None";
        const target = interaction.options.get("member");

        const user = method === "user" ? target?.user.id : target?.value.toString();

        try {
            await interaction.guild.members.ban(user, { reason: `${reason} - ${interaction.user.tag}` });

            const embed = new MessageEmbed({
                description: `Successfully banned <@${user}>.`,
                color: brandColor,
            });

            await interaction.reply({ embeds: [embed] });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
