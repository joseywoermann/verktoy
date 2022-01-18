import { MessageButton } from "discord.js";
import { Button } from "#util";

export const sourceButton: Button = {
    data: new MessageButton({
        label: "Source code",
        style: "LINK",
        url: "https://github.com/joseywoermann/verktoy",
    }),
    run: async () => {},
};
