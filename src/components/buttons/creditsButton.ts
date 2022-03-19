import { MessageButton } from "discord.js";
import { Button } from "#util";

export const creditsButton: Button = {
    data: new MessageButton({
        label: "View credits",
        style: "LINK",
        url: `https://github.com/joseywoermann/verktoy/blob/master/CREDITS.md`,
    }),
    run: async () => {},
};
