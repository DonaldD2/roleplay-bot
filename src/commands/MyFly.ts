import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import MyFly from '../components/embeds/MyFly';

export = {
    data: new SlashCommandBuilder()
        .setName('myfly')
        .setDescription('Sends a MyFly message')
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
        .addNumberOption((option) =>
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
        if (interaction.inCachedGuild()) {
            const location = interaction.options.getString('location');
            const status = interaction.options.getString('status');
            const number = interaction.options.getNumber('flight-number');

            await interaction.reply({
                embeds: [
                    MyFly.setDescription(
                        `MyFly Flight Number ${bold(
                            number as unknown as string
                        )} in ${bold(location as string)} is now ${bold(
                            status as string
                        )}!`
                    ),
                ],
            });
        }
    },
};
