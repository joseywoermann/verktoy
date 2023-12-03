import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "#util";

export const supportButton: Button = {
    data: new ButtonBuilder({
        label: "Support",
        style: ButtonStyle.Link,
        url: "https://github.com/joseywoermann/verktoy/issues",
    }),
    run: async () => {},
};
