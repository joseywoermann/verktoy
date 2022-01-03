import { Snowflake } from "discord.js";
import { checkPermissions } from "../util/checkPermissions.js";
import { handleError } from "../util/errorHandler.js";
import type { ChatInputCommand } from "../util/types";

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
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "KICK_MEMBERS"))) return;

        const user: Snowflake = interaction.options.get("member").user.id;
        const reason = interaction.options.get("reason")?.value ?? "No reason provided";

        try {
            await interaction.guild.members.kick(user, reason as string);
            await interaction.reply({ content: `Successfully kicked <@${user}>.` });
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
