import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "#util";

export const creditsButton: Button = {
    data: new ButtonBuilder({
        label: "View credits",
        style: ButtonStyle.Link,
        url: `https://github.com/joseywoermann/verktoy/blob/master/CREDITS.md`,
    }),
    run: async () => {},
};
