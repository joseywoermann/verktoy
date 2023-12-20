import { ChatInputCommand, brandColor } from "#util";
import * as QRCode from "qrcode";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

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

        await QRCode.toFile("./qrcode.png", input, {
            scale: 8,
        });

        const embed = new EmbedBuilder({
            title: "Here you go!",
            image: { url: "attachment://qrcode.png" },
            color: brandColor,
            footer: { text: input },
        });

        // wonky library design but ok
        await interaction.reply({ embeds: [embed], files: ["./qrcode.png"] });
    },
};
