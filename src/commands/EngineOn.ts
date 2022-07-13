import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import EngineOn from '../components/embeds/EngineOn';

export = {
    data: new SlashCommandBuilder()
        .setName('engine-on')
        .setDescription('Turn on your vehicle engine')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ embeds: [EngineOn] });
    },
};
