import { checkPermissions, ChatInputCommand, handleError, brandColor } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const ban: ChatInputCommand = {
    name: "ban",
    description: "Ban a user from the server.",
    options: [
        {
            name: "user",
            description: "user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "The user who should be banned",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the ban",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "id",
            description: "id",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "The user who should be banned",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the ban",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "BanMembers"))) return;

        if (!interaction.isChatInputCommand()) return;

        const method = interaction.options.getSubcommand();

        const reason = interaction.options.get("reason")?.value ?? "None";
        const target = interaction.options.get("member");

        const user = method === "user" ? target?.user.id : target?.value.toString();

        try {
            await interaction.guild.members.ban(user, { reason: `${reason} - ${interaction.user.tag}` });

            const embed = new EmbedBuilder({
                description: `Successfully banned <@${user}>.`,
                color: brandColor,
            });

            await interaction.reply({ embeds: [embed] });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
