import { ChatInputCommand } from "../util/types";

export const mute: ChatInputCommand = {
    name: "mute",
    description: "Mute a user for a given time",
    options: [
        {
            name: "duration",
            description: "The dureation the user should be mutet.",
            type: "INTEGER",
        },
    ],
    run: async (interaction) => {
        await interaction.reply({ content: "Not implemented" });
    },
};
