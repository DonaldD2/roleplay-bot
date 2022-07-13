import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Unlock from '../components/embeds/Unlock';

export = {
    data: new SlashCommandBuilder()
        .setName('un-lock')
        .setDescription('Unlocks your vehicle')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({
            embeds: [
                Unlock.setDescription(
                    bold(`${interaction.member?.user}`) +
                        'has unlocked their vehicle!'
                ),
            ],
        });
    },
};
