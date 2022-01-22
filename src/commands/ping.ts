import type { ChatInputCommand } from "#util";

export const ping: ChatInputCommand = {
    name: "ping",
    description: "Returns a Pong",
    type: "CHAT_INPUT",
    run: async (interaction) => {
        interaction.reply({
            embeds: [{ title: `Pong! ${interaction.client.ws.ping} ms`, color: "#D329A0" }],
        });
    },
};
