import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Lock from '../components/embeds/Lock';

export = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks your vehicle')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            if (interaction.inCachedGuild()) {
                await interaction.reply({
                    embeds: [
                        Lock.setDescription(
                            bold(`${interaction.member?.nickname}`) +
                                ' has locked their vehicle!'
                        ),
                    ],
                });
            }
        }
    },
};
