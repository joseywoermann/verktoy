import { MessageButton } from "discord.js";
import { Button } from "#util";

export const supportButton: Button = {
    data: new MessageButton({
        label: "Support",
        style: "LINK",
        url: "https://github.com/joseywoermann/verktoy/issues",
    }),
    run: async () => {},
};
