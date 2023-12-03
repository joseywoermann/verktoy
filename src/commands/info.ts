import { ActionRowBuilder, ButtonBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { ChatInputCommand, getMetrics as getMetrics, brandColor } from "#util";
import { creditsButton, inviteButton, sourceButton, supportButton } from "#buttons";

export const info: ChatInputCommand = {
    name: "info",
    description: "Show bot statistics & information",
    restricted: false,
    run: async (i: CommandInteraction) => {
        await i.deferReply();
        const { uptime, userCount, serverCount, channelCount, owner, memoryLoad } = await getMetrics(
            i.client,
        );

        const embed = new EmbedBuilder({
            title: `Bot metrics & statistics:`,
            color: brandColor,
            fields: [
                { name: "User count", value: block(userCount), inline: true },
                { name: "Server count", value: block(serverCount), inline: true },
                { name: "Channel count", value: block(channelCount), inline: true },
                { name: "Uptime", value: block(uptime) },
                // { name: "Commands run (all time)", value: block(commandRuns), inline: true },
                // { name: "Most popular command", value: block(`/${popular[0].name} | Run ${popular[0].count} times`), inline: true },
                { name: "Owner", value: block(`${owner.user.tag} | ${owner.github} | ${owner.website}`) },
                { name: "Library", value: block("discord.js v14"), inline: true },
                { name: "Bot version", value: block("v1.1.0"), inline: true },
                { name: "Memory usage", value: `${block(`${memoryLoad} MB`)}`, inline: true },
            ],
        });

        await i.editReply({
            embeds: [embed],
            components: [
                new ActionRowBuilder<ButtonBuilder>({
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
