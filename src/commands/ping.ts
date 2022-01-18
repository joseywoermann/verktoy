import type { ChatInputCommand } from "#util";

export const ping: ChatInputCommand = {
    name: "ping",
    description: "Returns a Pong",
    type: "CHAT_INPUT",
    run: async (interaction) => {
        interaction.reply({
            content: `Pong! ${interaction.client.ws.ping} ms`,
        });
    },
};
