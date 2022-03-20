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
    run: (interaction: ContextMenuInteraction) => Promise<void>;
}

/**
 * This type includes the Context Menu data for users & the `run()` method
 */
export interface UserContextCommand extends UserApplicationCommandData {
    run: (interaction: ContextMenuInteraction) => Promise<void>;
}

/**
 * All command types
 */
export type Command = ChatInputCommand | MessageContextCommand | UserContextCommand;

/**
 * This type includes the Button data and the `run()` method
 */
export interface Button {
    data: MessageButton;
    run: (interaction: ButtonInteraction) => Promise<void>;
}

/**
 * This type includes the Select data and the `run()` method
 */
export interface Select {
    data: MessageSelectMenu;
    run: (interaction: SelectMenuInteraction) => Promise<void>;
}

/**
 * All message components
 */
export type MessageComponent = Button | Select;

/**
 * Raw response from the Statcord-API
 */
export interface APIResponse {
    error: boolean;
    message?: string;
    data?: RawMetrics[];
    popular?: unknown[];
}

/**
 * Raw metrics
 */
interface RawMetrics {
    time: number;
    servers: string;
    users: string;
    commands: string;
    active: string;
    custom1: string;
    custom2: string;
    memactive: string;
    memload: string;
    bandwidth: string;
    cpuload: string;
    count: number;
    popular: Popular[];
    votes: number;
}

interface Popular {
    name: string;
    count: string;
}

/**
 * Stripped metrics
 */
interface StrippedMetrics {
    time: number;
    servers: string;
    users: string;
    commands: string;
    active: string;
    memactive: string;
    memload: string;
    count: number;
    popular: Popular[];
    votes: number;
}

export interface Metrics {
    error: { occured: boolean; message?: string };
    metrics?: StrippedMetrics;
}
