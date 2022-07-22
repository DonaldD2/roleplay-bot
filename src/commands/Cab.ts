import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Cab from '../components/embeds/Cab';

export = {
    data: new SlashCommandBuilder()
        .setName('cab')
        .setDescription('Sends a Downtown Cab Co. message')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('Your location for a cab to pick you up')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                const location = interaction.options.getString('location');
                interaction.reply({
                    embeds: [
                        Cab.setDescription(
                            `A cab has been requested by ${
                                interaction.member
                            } at ${bold(location as string)}`
                        ),
                    ],
                });
            }
        }
    },
};
