import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder, bold } from '@discordjs/builders';
import Search, { Found } from '../components/embeds/Search';
import { setTimeout } from 'timers/promises';
import Inventory from '../models/Inventory';

export = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search a user')
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to search')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        //@ts-ignore
        Search.description += bold(interaction.options.getMember('user'));
        await interaction.reply({ embeds: [Search] });
        await setTimeout(5000);
        Inventory.findOne(
            {
                //@ts-ignore
                discordId: `${interaction.user.id}`,
            },
            'items',
            async (err, inventory) => {
                if (err) console.log(err);
                if (inventory) {
                    if (inventory!.items.length > 0) {
                        inventory?.items.forEach((item) => {
                            Found.description += `${item},\n`;
                        });
                        await interaction.editReply({ embeds: [Found] });
                    } else {
                        Found.description = 'No items Found';
                        await interaction.editReply({ embeds: [Found] });
                    }
                }
            }
        );
        Search.description = 'Searching ';
        Found.description = '';
    },
};
