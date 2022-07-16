import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import TwentyFourSeven from '../components/embeds/TwentyFourSeven';

export = {
    data: new SlashCommandBuilder()
        .setName('24-7')
        .setDescription('Sends a 24/7 advertisement')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('Location of the 24/7')
                .setRequired(true)

                .addChoices(
                    {
                        name: 'Alhambra Drive, Sandy Shores',
                        value: 'Alhambra Drive, Sandy Shores',
                    },
                    {
                        name: 'Innocence Boulevard, Strawberry',
                        value: 'Innocence Boulevard, Strawberry',
                    },
                    {
                        name: 'Clifton Avenue, Downtown Vinewood',
                        value: 'Clifton Avenue, Downtown Vinewood',
                    },
                    {
                        name: 'Barbareno Road, Chumash',
                        value: 'Barbareno Road, Chumash',
                    },
                    {
                        name: 'Ineseno, Banham Canyon',
                        value: 'Ineseno, Banham Canyon',
                    },
                    {
                        name: 'Tataviam, Palomino Freeway',
                        value: 'Tataviam, Palomino Freeway',
                    },
                    { name: 'Route 68, Harmony', value: 'Route 68, Harmony' },
                    {
                        name: 'Senora Freeway, Grand Senora Desert',
                        value: 'Senora Freeway, Grand Senora Desert',
                    },
                    {
                        name: 'Senora Freeway, Mount Chiliad',
                        value: 'Senora Freeway, Mount Chiliad',
                    },
                    {
                        name: 'Vinewood Boulevard, Downtown Vinewood',
                        value: 'Vinewood Boulevard, Downtown Vinewood',
                    },
                    {
                        name: 'Hawick Avenue, Alta',
                        value: 'Hawick Avenue, Alta',
                    },
                    {
                        name: 'Vinewood Plaza, Spanish Avenue',
                        value: 'Vinewood Plaza, Spanish Avenue',
                    },
                    {
                        name: 'Elgin Avenue, Hawick',
                        value: 'Elgin Avenue, Hawick',
                    },
                    {
                        name: 'Korean Plaza, Calais Avenue',
                        value: 'Korean Plaza, Calais Avenue',
                    },
                    {
                        name: 'Vespucci Boulevard, Little Seoul',
                        value: 'Vespucci Boulevard, Little Seoul',
                    },
                    {
                        name: 'Route 68, Lago Zancudo',
                        value: 'Route 68, Lago Zancudo',
                    }
                )
        )
        .addStringOption((option) =>
            option
                .setName('status')
                .setDescription('Choose if the 24/7 is opened or closed')
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
        const location = interaction.options.getString('location');
        const status = interaction.options.getString('status');
        interaction.reply({
            embeds: [
                TwentyFourSeven.setDescription(
                    `The 24/7 in ${bold(location as string)} is now ${bold(
                        status as string
                    )}!`
                ),
            ],
        });
    },
};
