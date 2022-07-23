import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import EngineOn from '../components/embeds/EngineOn';

export = {
    data: new SlashCommandBuilder()
        .setName('engine-on')
        .setDescription('Turn on your vehicle engine')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        EngineOn(interaction!)
        await interaction.reply({ content: 'You turned your engine on successfully.', ephemeral: true });
    },
};
