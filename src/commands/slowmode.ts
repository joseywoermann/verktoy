import { checkPermissions, ChatInputCommand, handleError } from "#util";

export const slowmode: ChatInputCommand = {
    name: "slowmode",
    description: "Enable slowmode in this channel",
    options: [
        {
            name: "delay",
            description: "How many seconds the users have to wait before sending messages.",
            type: "INTEGER",
            required: true,
            maxValue: 21600,
        },
    ],
    restricted: true,
    run: async (interaction) => {
        if (!(await checkPermissions(interaction, "MANAGE_CHANNELS"))) return;
        const delay = Number(interaction.options.get("delay").value);

        try {
            if (interaction.channel.type === "GUILD_TEXT") {
                await interaction.channel.setRateLimitPerUser(delay);
                await interaction.reply({ content: `Successfully set slowmode to ${delay} seconds.` });
            } else {
                await interaction.reply({ content: "wrong channel type" });
            }
        } catch (e) {
            await handleError(interaction, e as Error);
        }
    },
};
