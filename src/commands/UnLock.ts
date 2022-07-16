import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Unlock from '../components/embeds/Unlock';

export = {
    data: new SlashCommandBuilder()
        .setName('un-lock')
        .setDescription('Unlocks your vehicle')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            await interaction.reply({
                embeds: [
                    Unlock.setDescription(
                        bold(`${interaction.member?.nickname}`) +
                            ' has unlocked their vehicle!'
                    ),
                ],
            });
        }
    },
};
