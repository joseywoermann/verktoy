import { MessageButton } from "discord.js";
import { Button } from "../../util/types";

export const inviteButton: Button = {
    data: new MessageButton({
        label: "Invite me!",
        style: "LINK",
        url: `https://discord.com/oauth2/authorize?client_id=881990879433330700&permissions=8&scope=bot%20applications.commands`,
    }),
    run: async () => {},
};
