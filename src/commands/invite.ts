import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";

export const invite: ChatInputCommand = {
    name: "invite",
    description: "Add this bot to your server.",
    type: "CHAT_INPUT",
    run: async (i) => {
        const embed = new MessageEmbed({
            title: "Add me to your server!",
            url: `https://discord.com/oauth2/authorize?client_id=927279520959053824&permissions=8&scope=bot%20applications.commands`,
            color: "#D329A0",
        });
        await i.reply({ embeds: [embed] });
    },
};
