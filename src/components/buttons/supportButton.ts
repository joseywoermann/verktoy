import { MessageButton } from "discord.js";
import { Button } from "#util/types";

export const supportButton: Button = {
    data: new MessageButton({
        label: "Get help",
        style: "LINK",
        url: "https://github.com/joseywoermann/verktoy/issues",
    }),
    run: async () => {},
};
