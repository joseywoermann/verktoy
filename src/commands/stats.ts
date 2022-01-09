import type { ChatInputCommand } from "../util/types";
import { owner } from "../util/constants.js";
import { MessageActionRow, MessageEmbed, User } from "discord.js";
import { formatDuration } from "../util/formatTime.js";
import { inviteButton } from "../components/buttons/inviteButton.js";
import { supportButton } from "../components/buttons/supportButton.js";
import { sourceButton } from "../components/buttons/sourceButton.js";
import { fetchMetrics } from "../util/metrics.js";

export const stats: ChatInputCommand = {
    name: "stats",
    description: "Show bot statistics",
    run: async (interaction) => {
        await interaction.deferReply();
        const data = await fetchMetrics(interaction.client.user.id);

        if (data.error.occured) {
            await interaction.editReply({ content: `Something went wrong: ${data.error.message}` });
        } else {
            const { memactive, users, servers, commands: commandRuns, popular } = data.metrics;

            let memUsage = (Number(memactive) / 1024 / 1024).toString();
            memUsage = memUsage.slice(0, memUsage.length - 13);

            const embed = new MessageEmbed({
                title: `Bot metrics & statistics:`,
                color: "#D329A0",
                fields: [
                    { name: "User count", value: block(users), inline: true },
                    { name: "Server count", value: block(servers), inline: true },
                    {
                        name: "Channel count",
                        value: block(interaction.client.channels.cache.size),
                        inline: true,
                    },
                    {
                        name: "Uptime",
                        value: block(await formatDuration(interaction.client?.uptime)),
                    },
                    { name: "Commands run (all time)", value: block(commandRuns), inline: true },
                    {
                        name: "Most popular command",
                        value: block(`${popular[0].name} | Run ${popular[0].count} times`),
                        inline: true,
                    },
                    {
                        name: "Owner",
                        value: block(((await interaction.client.users.fetch(owner)) as User)?.tag),
                    },
                    { name: "Library", value: block("discord.js v13.5.1"), inline: true },
                    { name: "Bot version", value: block("v0.1.0"), inline: true },
                    { name: "Memory usage", value: `${block(memUsage)} MB`, inline: true },
                ],
            });

            await interaction.editReply({
                embeds: [embed],
                components: [
                    new MessageActionRow({
                        components: [inviteButton.data, sourceButton.data, supportButton.data],
                    }),
                ],
            });
        }
    },
};

const block = (text: string | number | true) => `\`\`\`${text}\`\`\``;