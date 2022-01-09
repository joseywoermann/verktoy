import { MessageButton } from "discord.js";
import { Button } from "../../util/types";
import { oauth2Permissions } from "../../util/constants.js";

export const inviteButton: Button = {
    data: new MessageButton({
        label: "Invite me!",
        style: "LINK",
        url: `https://discord.com/oauth2/authorize?client_id=881990879433330700&permissions=${oauth2Permissions}&scope=bot%20applications.commands`,
    }),
    run: async () => {},
};
