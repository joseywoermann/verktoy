import { brandColor, ChatInputCommand } from "#util";
import { EmbedBuilder, User } from "discord.js";

export const serverinfo: ChatInputCommand = {
    name: "serverinfo",
    description: "Show information about the server",
    restricted: false,
    run: async (interaction) => {
        const guild = interaction.guild;

        const embed = new EmbedBuilder({
            title: `${guild.name}`,
            fields: [
                {
                    name: "Members",
                    value: `${guild.memberCount}`,
                    inline: true,
                },
                {
                    name: "Channels",
                    value: `${guild.channels.channelCountWithoutThreads}`,
                    inline: true,
                },
                {
                    name: "Roles",
                    value: `${(await guild.roles.fetch()).size}`,
                    inline: true,
                },
                {
                    name: "Owner",
                    value: `${((await interaction.client.users.fetch(guild.ownerId)) as User)?.tag}`,
                    inline: true,
                },
                // {
                //     name: "Boost status",
                //     value: `${guild.premiumSubscriptionCount} Boosts | Level ${await boostLevel(
                //         guild.premiumTier
                //     )}`,
                //     inline: true,
                // },
                {
                    name: "Extras",
                    value: `${guild.verified ? "Verified" : "Not verified"}, ${
                        guild.partnered ? "Partnered" : "Not partnered"
                    }`,
                    inline: true,
                },
            ],
            footer: { text: `Created on ${guild.createdAt.toDateString()} | ID: ${guild.id}` },
            thumbnail: null,
            image: null,
            color: brandColor,
        });

        if (guild.iconURL() !== null) {
            embed.setThumbnail(guild.iconURL());
        }

        // not tested due to lack of guilds that meet this requirement but it should™ work
        if (guild.bannerURL() !== null) {
            embed.setImage(guild.bannerURL());
        }

        await interaction.reply({ embeds: [embed] });
    },
};

/**
 * Return the guild's boost level as an integer
 * @param premiumTier
 * @returns
 */
const boostLevel = async (premiumTier: "NONE" | "TIER_1" | "TIER_2" | "TIER_3"): Promise<number> => {
    switch (premiumTier) {
        case "NONE":
            return 0;

        case "TIER_1":
            return 1;

        case "TIER_2":
            return 2;

        case "TIER_3":
            return 3;
    }
};
