import { ChatInputCommand } from "#util";
import { MessageEmbed } from "discord.js";
import * as QRCode from "qrcode";

export const qrcode: ChatInputCommand = {
    name: "qrcode",
    description: "Generate a QR-code",
    options: [
        {
            name: "url",
            description: "The URL (or text) to store in the QR code",
            type: "STRING",
            required: true,
        },
    ],
    restricted: false,
    run: async (interaction) => {
        const input = interaction.options.get("url").value as string;

        await QRCode.toFile("./qrcode.png", input);

        const embed = new MessageEmbed({ title: "test", image: { url: "attachment://qrcode.png" } });
        await interaction.reply({ embeds: [embed] });
    },
};
