import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import FlyUS from '../components/embeds/FlyUS';

export = {
    data: new SlashCommandBuilder()
        .setName('flyus')
        .setDescription('Sends a FlyUS message')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('status')
                .setDescription('The status of your plane')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Taking Off',
                        value: 'Taking Off',
                    },
                    { name: 'Boarding', value: 'Boarding' },
                    { name: 'Landing', value: 'Landing' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('flight-number')
                .setDescription('The flight number of your plane')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('The location of the plane')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Los Santos International Airport',
                        value: 'Los Santos International Airport',
                    },
                    { name: 'McKenzie Airfield', value: 'McKenzie Airfield' },
                    {
                        name: 'Sandy Shores Airfield',
                        value: 'Sandy Shores Airfield',
                    },
                    {
                        name: 'Fort Zancudo Military Base',
                        value: 'Fort Zancudo Military Base',
                    }
                )
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                const location = interaction.options.getString('location');
                const status = interaction.options.getString('status');
                const number = interaction.options.getString('flight-number');

                interaction.reply({
                    embeds: [
                        FlyUS.setDescription(
                            `FlyUS Flight Number ${bold(
                                number as string
                            )} in ${bold(location as string)} is now ${bold(
                                status as string
                            )}!`
                        ),
                    ],
                });
            }
        }
    },
};
