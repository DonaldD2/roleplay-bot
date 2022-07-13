import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Lock from '../components/embeds/Lock';

export = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks your vehicle')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({
            embeds: [
                Lock.setDescription(
                    bold(`${interaction.member?.user}`) +
                        'has locked their vehicle!'
                ),
            ],
        });
    },
};
