import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import EngineOff from '../components/embeds/EngineOff';

export = {
    data: new SlashCommandBuilder()
        .setName('engine-off')
        .setDescription('Turn off your vehicle engine')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        EngineOff(interaction!);
        await interaction.reply({
            content: 'You turned your engine on successfully.',
            ephemeral: true,
        });
    },
};
