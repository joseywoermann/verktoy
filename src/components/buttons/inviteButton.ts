import { MessageButton } from "discord.js";
import { Button, oauth2Permissions } from "#util";

export const inviteButton: Button = {
    data: new MessageButton({
        label: "Invite me!",
        style: "LINK",
        url: `https://discord.com/oauth2/authorize?client_id=881990879433330700&permissions=${oauth2Permissions}&scope=bot%20applications.commands`,
    }),
    run: async () => {},
};
