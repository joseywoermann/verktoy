import { CommandInteraction, ContextMenuInteraction, MessageEmbed, User } from "discord.js";
import { brandColor } from "#util";

/**
 * Fetch all informantion about a user and generate a nice embed displaying that data.
 * @param interaction
 * @param user
 * @returns
 */
export const getUserInfo = async (
    interaction: CommandInteraction | ContextMenuInteraction,
    user: User
): Promise<MessageEmbed> => {
    const member = await interaction.guild.members.fetch(user?.id);

    const perms = member.permissions.toArray();

    const accountCreated = Math.round(user?.createdAt.getTime() / 1000);
    const serverJoined = Math.round(member?.joinedAt.getTime() / 1000);

    const isAdmin = member.permissions.toArray().includes("ADMINISTRATOR") ? "Yes" : "No";
    const isModerator = perms.includes("MANAGE_MESSAGES") || isAdmin ? "Yes" : "No";

    const roleCount = member.roles.cache.size - 1; // exclude @everyone
    let roles = "";

    member.roles.cache.each((role) => {
        if (role.name !== "@everyone") {
            roles += `<@&${role.id}> `;
        }
    });

    const embed = new MessageEmbed({
        title: user?.tag,
        fields: [
            { name: "ID", value: user?.id, inline: true },
            { name: "Account type", value: user?.bot ? "Bot" : "User", inline: true },
            { name: `Roles [${roleCount}]`, value: `${roles || "None"}` },
            { name: `Administrator`, value: `${isAdmin}`, inline: true },
            { name: `Moderator`, value: `${isModerator}`, inline: true },
            { name: "Booster", value: `${member.premiumSince ? "Yes" : "No"}`, inline: true },
            { name: "Discord user since", value: `<t:${accountCreated}>`, inline: true },
            { name: "Server member since", value: `<t:${serverJoined}>`, inline: true },
        ],
        thumbnail: { url: user?.avatarURL() ?? user?.defaultAvatarURL },
        color: brandColor,
    });

    return embed;
};
