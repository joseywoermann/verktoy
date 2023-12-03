import { checkPermissions, handleError, ChatInputCommand, brandColor } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export const roles: ChatInputCommand = {
    name: "roles",
    description: "Add & remove roles from a user",
    options: [
        {
            name: "add",
            description: "Add roles to a user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "The role to add",
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
                {
                    name: "user",
                    description: "The user to add the role to",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: "remove",
            description: "Remove roles to a user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "The role to remove",
                    type: ApplicationCommandOptionType.Role,
                    required: true,
                },
                {
                    name: "user",
                    description: "The user to remove the role from",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "ManageRoles"))) return;
        if (!interaction.isChatInputCommand()) return;

        const method = interaction.options.getSubcommand();
        const role = interaction.options.get("role").role;
        const user = interaction.options.get("user").user;
        const member = await interaction.guild.members.fetch(user?.id);

        try {
            if (method === "add") {
                await member.roles.add(role?.id);

                const embed = new EmbedBuilder({
                    description: `Successfully added <@&${role.id}> to <@${user.id}>.`,
                    color: brandColor,
                });
                await interaction.reply({ embeds: [embed] });
            } else if (method === "remove") {
                await member.roles.remove(role?.id);

                const embed = new EmbedBuilder({
                    description: `Successfully removed <@&${role.id}> from <@${user.id}>.`,
                    color: brandColor,
                });
                await interaction.reply({ embeds: [embed] });
            }
        } catch (e) {
            await handleError(interaction, e as Error);
        }
    },
};
