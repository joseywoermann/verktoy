import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "#util";

export const sourceButton: Button = {
    data: new ButtonBuilder({
        label: "View source",
        style: ButtonStyle.Link,
        url: "https://github.com/joseywoermann/verktoy",
    }),
    run: async () => {},
};
