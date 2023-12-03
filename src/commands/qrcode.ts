import { ChatInputCommand } from "#util";
import * as QRCode from "qrcode";
import { ApplicationCommandOptionType } from "discord.js"

export const qrcode: ChatInputCommand = {
    name: "qrcode",
    description: "Generate a QR-code",
    options: [
        {
            name: "url",
            description: "The URL (or text) to store in the QR code",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const input = interaction.options.get("url").value as string;

        await QRCode.toFile("./qrcode.png", input);

        await interaction.reply({ files: [{ attachment: "./qrcode.png" }] });
    },
};
