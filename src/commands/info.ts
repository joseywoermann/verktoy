import { MessageActionRow, MessageEmbed, User } from "discord.js";
import { ChatInputCommand, ownerID, formatDuration, fetchMetrics, brandColor } from "#util";
import { creditsButton, inviteButton, sourceButton, supportButton } from "#buttons";

export const info: ChatInputCommand = {
    name: "info",
    description: "Show bot statistics & information",
    restricted: false,
    run: async (i) => {
        await i.deferReply();
        const data = await fetchMetrics(i.client.user.id);

        if (data.error.occured) {
            await i.editReply({ content: `Something went wrong: ${data.error.message}` });
            return;
        }

        // extract necessary information
        const { memactive, users, servers, commands: commandRuns, popular } = data.metrics;

        let memUsage = (Number(memactive) / 1024 / 1024).toString();
        // remove all but 1 decimal places
        memUsage = memUsage.slice(0, memUsage.length - 13);

        const owner = (await i.client.users.fetch(ownerID)) as User;

        const embed = new MessageEmbed({
            title: `Bot metrics & statistics:`,
            color: brandColor,
            fields: [
                { name: "User count", value: block(users), inline: true },
                { name: "Server count", value: block(servers), inline: true },
                {
                    name: "Channel count",
                    value: block(i.client.channels.cache.size),
                    inline: true,
                },
                { name: "Uptime", value: block(await formatDuration(i.client?.uptime)) },
                { name: "Commands run (all time)", value: block(commandRuns), inline: true },
                {
                    name: "Most popular command",
                    value: block(`/${popular[0].name} | Run ${popular[0].count} times`),
                    inline: true,
                },
                { name: "Owner", value: block(`${owner?.tag} | ID: ${owner?.id}`) },
                { name: "Library", value: block("discord.js v13"), inline: true },
                { name: "Bot version", value: block("v1.0.0"), inline: true },
                { name: "Memory usage", value: `${block(`${memUsage} MB`)}`, inline: true },
            ],
        });

        await i.editReply({
            embeds: [embed],
            components: [
                new MessageActionRow({
                    components: [
                        inviteButton.data,
                        supportButton.data,
                        sourceButton.data,
                        creditsButton.data,
                    ],
                }),
            ],
        });
    },
};

const block = (text: string | number | boolean) => `\`\`\`${text}\`\`\``;
