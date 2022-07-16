import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import EngineOff from '../components/embeds/EngineOff';

export = {
    data: new SlashCommandBuilder()
        .setName('engine-off')
        .setDescription('Turn off your vehicle engine')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            await interaction.reply({ embeds: [EngineOff] });
        }
    },
};
