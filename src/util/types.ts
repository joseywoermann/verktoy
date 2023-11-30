import type {
    AutocompleteInteraction,
    ButtonInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    ContextMenuCommandInteraction,
    MessageApplicationCommandData,
    ButtonBuilder,
    StringSelectMenuBuilder,
    SelectMenuInteraction,
    UserApplicationCommandData,
} from "discord.js";

/**
 * This type includes the Slash Command data & the `run()` method
 */
export interface ChatInputCommand extends ChatInputApplicationCommandData {
    restricted: boolean;
    run: (interaction: CommandInteraction) => Promise<void>;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}

/**
 * This type includes the Context Menu data for messages & the `run()` method
 */
export interface MessageContextCommand extends MessageApplicationCommandData {
    run: (interaction: ContextMenuCommandInteraction) => Promise<void>;
}

/**
 * This type includes the Context Menu data for users & the `run()` method
 */
export interface UserContextCommand extends UserApplicationCommandData {
    run: (interaction: ContextMenuCommandInteraction) => Promise<void>;
}

/**
 * All command types
 */
export type Command = ChatInputCommand | MessageContextCommand | UserContextCommand;

/**
 * This type includes the Button data and the `run()` method
 */
export interface Button {
    data: ButtonBuilder;
    run: (interaction: ButtonInteraction) => Promise<void>;
}

/**
 * This type includes the Select data and the `run()` method
 */
export interface Select {
    data: StringSelectMenuBuilder;
    run: (interaction: SelectMenuInteraction) => Promise<void>;
}

/**
 * All message components
 */
export type MessageComponent = Button | Select;
