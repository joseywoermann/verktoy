import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "#util";

export const inviteButton: Button = {
    data: new ButtonBuilder({
        label: "Invite me!",
        style: ButtonStyle.Link,
        url: `https://discord.com/oauth2/authorize?client_id=927279520959053824&permissions=1504311569495&scope=bot%20applications.commands`,
    }),
    run: async () => {},
};
