import { brandColor, ChatInputCommand } from "#util";

export const ping: ChatInputCommand = {
    name: "ping",
    description: "Returns a Pong",
    restricted: false,
    run: async (interaction) => {
        interaction.reply({
            embeds: [
                {
                    title: `Pong! ${interaction.client.ws.ping} ms`,
                    color: brandColor,
                },
            ],
        });
    },
};
