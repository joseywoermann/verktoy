import { brandColor, ChatInputCommand } from "#util";
import { EmbedBuilder } from "discord.js";

export const invite: ChatInputCommand = {
    name: "invite",
    description: "Add this bot to your server.",
    restricted: false,
    run: async (i) => {
        const embed = new EmbedBuilder({
            title: "Add me to your server!",
            url: `https://discord.com/oauth2/authorize?client_id=927279520959053824&permissions=1504311569495&scope=bot%20applications.commands`,
            color: brandColor,
        });
        await i.reply({ embeds: [embed] });
    },
};
