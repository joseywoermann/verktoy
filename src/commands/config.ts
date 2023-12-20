import { ChatInputCommand, handleError, brandColor, ownerID, logger, defaultPresence } from "#util";
import {
    EmbedBuilder,
    ApplicationCommandOptionType,
    PresenceData,
    ActivityType,
    Colors,
    PresenceStatusData,
} from "discord.js";

export const config: ChatInputCommand = {
    name: "config",
    description: "Configure settings for the bot",
    options: [
        {
            name: "setstatus",
            description: "Set the bot's custom status",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "text",
                    description: "The status text",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
        {
            name: "shutdown",
            description: "Shuts the bot down",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (String(interaction.user.id) !== ownerID) return;
        if (!interaction.isChatInputCommand()) return;

        await interaction.deferReply({ ephemeral: true });

        const command = interaction.options.getSubcommand();
        try {
            if (command === "setstatus") {
                const text = interaction.options.get("text")?.value as string;

                const newPresence: PresenceData = {
                    status: "online",
                    activities: [{ type: ActivityType.Custom, name: text }],
                };

                interaction.client.user.setPresence(newPresence);

                const embed = new EmbedBuilder({
                    title: `Changed status to \`${text}\`.`,
                    color: brandColor,
                });

                await interaction.editReply({ embeds: [embed] });
            } else if (command === "shutdown") {
                const embed = new EmbedBuilder({
                    title: `Shutting down bot...`,
                    color: Colors.Red,
                });

                await interaction.editReply({ embeds: [embed] });
                process.exit();
            }
        } catch (e: unknown) {
            await handleError(interaction, e as Error);
        }
    },
};
