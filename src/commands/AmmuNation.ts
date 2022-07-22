import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import AmmuNation from '../components/embeds/AmmuNation';

export = {
    data: new SlashCommandBuilder()
        .setName('ammunation')
        .setDescription('Sends a ammu-nation message')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('Location of the Ammu-nation')
                .setRequired(true)
                .addChoices(
                    {
                        name: "Adam's Apple Boulevard and Elgin Avenue in Downtown Los Santos",
                        value: "Adam's Apple Boulevard and Elgin Avenue in Downtown Los Santos",
                    },
                    {
                        name: 'Lindsay Circus and Palomino Avenue in Little Seoul',
                        value: 'Lindsay Circus and Palomino Avenue in Little Seoul',
                    },
                    {
                        name: 'Popular Street in Cypress Flats, East Los Santos',
                        value: 'Popular Street in Cypress Flats, East Los Santos',
                    },
                    {
                        name: 'Tataviam Truckstop, in the Tataviam Mountains',
                        value: 'Tataviam Truckstop, in the Tataviam Mountains',
                    },
                    { name: 'Paleto Bay', value: 'Paleto Bay' },
                    {
                        name: 'Algonquin Boulevard, Sandy Shores',
                        value: 'Algonquin Boulevard, Sandy Shores',
                    },
                    {
                        name: 'Boulevard Del Perro, Morningwood',
                        value: 'Boulevard Del Perro, Morningwood',
                    },
                    {
                        name: 'Vinewood Plaza, Spanish Avenue, Hawick',
                        value: 'Vinewood Plaza, Spanish Avenue, Hawick',
                    },
                    {
                        name: '325 Vespucci Boulevard in Mission Row',
                        value: '325 Vespucci Boulevard in Mission Row',
                    },
                    {
                        name: 'Chumash Plaza, Great Ocean Highway, Chumash',
                        value: 'Chumash Plaza, Great Ocean Highway, Chumash',
                    }
                )
        )
        .addStringOption((option) =>
            option
                .setName('status')
                .setDescription('Choose if the AmmuNation is opened or closed')
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
        if (interaction.isChatInputCommand()) {
            const location = interaction.options.getString('location');
            const status = interaction.options.getString('status');

            interaction.reply({
                embeds: [
                    AmmuNation.setDescription(
                        `The AmmuNation in ${bold(
                            location as string
                        )} is now ${bold(status as string)}!`
                    ),
                ],
            });
        }
    },
};
