import {
    ButtonStyle,
    type AutocompleteInteraction,
    type ButtonInteraction,
    type CommandInteraction,
    type ContextMenuCommandInteraction,
    type Interaction,
    type SelectMenuInteraction,
} from "discord.js";
import { commands } from "../commands/__loader.js";
import { buttons } from "../components/buttons/__loader.js";
// import { selects } from "../components/selects/__loader.js";
import { ChatInputCommand, MessageContextCommand, UserContextCommand, logger } from "#util";

export const handleInteraction = async (interaction: Interaction): Promise<void> => {
    if (interaction.isContextMenuCommand()) return await handleContextInteraction(interaction);
    if (interaction.isCommand()) return await handleMessageInteraction(interaction);
    if (interaction.isButton()) return await handleButtonInteraction(interaction);
    // if (interaction.isSelectMenu()) return await handleSelectInteraction(interaction);
    if (interaction.isAutocomplete()) return await handleAutocompleteInteraction(interaction);
};

const handleMessageInteraction = async (interaction: CommandInteraction) => {
    try {
        const command = commands.get(interaction.commandName) as ChatInputCommand;
        if (!command) return;
        await command.run(interaction);
    } catch (e) {
        logger.error(e);
    }
};

const handleContextInteraction = async (interaction: ContextMenuCommandInteraction) => {
    try {
        const command = commands.get(interaction.commandName) as MessageContextCommand | UserContextCommand;

        if (!command) return;
        await command.run(interaction);
    } catch (e) {
        logger.error(e);
    }
};

const handleButtonInteraction = async (interaction: ButtonInteraction) => {
    try {
        const button = buttons.get(interaction.customId);
        if (!button) return;
        if (button.data.data.style === ButtonStyle.Link) return;
        await button.run(interaction);
    } catch (e) {
        logger.error(e);
    }
};

// const handleSelectInteraction = async (interaction: SelectMenuInteraction) => {
//     try {
//         const select = selects.get(interaction.customId);
//         if (!select) return;
//         await select.run(interaction);
//     } catch (e) {
//         logger.error(e);
//     }
// };

const handleAutocompleteInteraction = async (interaction: AutocompleteInteraction) => {
    try {
        const command = commands.get(interaction.commandName) as ChatInputCommand;
        if (!command) return;
        if (command.autocomplete === undefined) return;
        await command.autocomplete(interaction);
    } catch (e) {
        logger.error(e);
    }
};
