import type {
    AutocompleteInteraction,
    ButtonInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    ContextMenuInteraction,
    MessageApplicationCommandData,
    MessageButton,
    MessageSelectMenu,
    SelectMenuInteraction,
    UserApplicationCommandData,
} from "discord.js";

/**
 * This type includes the Slash Command data & the run() method
 */
export interface ChatInputCommand extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction) => Promise<void>;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}

/**
 * This type includes the Context Menu data for messages & the run() method
 */
export interface MessageContextCommand extends MessageApplicationCommandData {
    run: (interaction: ContextMenuInteraction) => Promise<void>;
}

/**
 * This type includes the Context Menu data for users & the run() method
 */
export interface UserContextCommand extends UserApplicationCommandData {
    run: (interaction: ContextMenuInteraction) => Promise<void>;
}

/**
 * All command types
 */
export type Command = ChatInputCommand | MessageContextCommand | UserContextCommand;

/**
 * This type includes the Button data and the run() method
 */
export interface Button {
    data: MessageButton;
    run: (interaction: ButtonInteraction) => Promise<void>;
}

/**
 * This type includes the Button data and the run() method
 */
export interface Select {
    data: MessageSelectMenu;
    run: (interaction: SelectMenuInteraction) => Promise<void>;
}
