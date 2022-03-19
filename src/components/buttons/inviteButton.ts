import { MessageButton } from "discord.js";
import { Button } from "#util";

export const inviteButton: Button = {
    data: new MessageButton({
        label: "Invite me!",
        style: "LINK",
        url: `https://discord.com/oauth2/authorize?client_id=927279520959053824&permissions=8&scope=bot%20applications.commands`,
    }),
    run: async () => {},
};
