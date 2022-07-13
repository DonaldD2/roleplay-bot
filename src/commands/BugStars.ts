import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import BugStars from '../components/embeds/BugStars';

export = {
    data: new SlashCommandBuilder()
        .setName('bug-stars')
        .setDescription('Sends a BugStars message')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('status')
                .setDescription('Choose if BugStars is opened or closed')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Open',
                        value: 'Open',
                    },
                    { name: 'Closed', value: 'Closed' }
                )
        ),
    async execute(interaction: CommandInteraction) {
        const status: string | null = interaction.options.getString('status');
        await interaction.reply({
            embeds: [
                BugStars.setDescription(
                    `BugStars is now ${bold(status as string)}!`
                ),
            ],
        });
    },
};
