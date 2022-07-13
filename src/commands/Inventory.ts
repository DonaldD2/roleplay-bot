import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Inventory from '../models/Inventory';
import { Found } from '../components/embeds/Inventory';

export = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Inventory commands')
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Add an item to your inventory')
                .addStringOption((option) =>
                    option
                        .setName('item')
                        .setDescription('The item you add to your inventory')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Remove an item to your inventory')
                .addStringOption((option) =>
                    option
                        .setName('item')
                        .setDescription(
                            'The item you want to remove from your inventory'
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('list')
                .setDescription('Get your current inventory')
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('reset').setDescription('Reset your inventory')
        ),

    async execute(interaction: CommandInteraction) {
        if (interaction.options.getSubcommand() === 'add') {
            Inventory.findOne(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                'items',
                async (err, inventory) => {
                    if (err) console.log(err);
                    if (inventory) {
                        Inventory.updateOne(
                            //@ts-ignore
                            { discordId: `${interaction.member?.id}` },
                            {
                                $push: {
                                    items: `${interaction.options.getString(
                                        'item'
                                    )}`,
                                },
                            },
                            null,
                            async (err) => {
                                if (err) console.log(err);
                                await interaction.reply({
                                    content: `${interaction.options.getString(
                                        'item'
                                    )} has been added to your inventory`,
                                    ephemeral: true,
                                });
                            }
                        );
                    } else {
                        Inventory.create({
                            //@ts-ignore
                            discordId: `${interaction.member?.id}`,
                            items: [`${interaction.options.getString('item')}`],
                        });
                        await interaction.reply({
                            content: `${interaction.options.getString(
                                'item'
                            )} has been added to your inventory`,
                            ephemeral: true,
                        });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'remove') {
            Inventory.findOne(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                'items',
                async (err, inventory) => {
                    if (err) console.log(err);
                    if (inventory) {
                        Inventory.updateOne(
                            //@ts-ignore
                            { discordId: `${interaction.member?.id}` },
                            {
                                $pull: {
                                    items: `${interaction.options.getString(
                                        'item'
                                    )}`,
                                },
                            },
                            null,
                            async (err) => {
                                if (err) console.log(err);
                                await interaction.reply({
                                    content: `${interaction.options.getString(
                                        'item'
                                    )} has been removed from your inventory`,
                                    ephemeral: true,
                                });
                            }
                        );
                    } else {
                        await interaction.reply({
                            content: `You don't have any items`,
                            ephemeral: true,
                        });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'list') {
            Inventory.findOne(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                'items',
                async (err, inventory) => {
                    if (err) console.log(err);
                    if (!inventory) {
                        await interaction.reply({
                            embeds: [Found.setDescription(`No items Found`)],
                            ephemeral: true,
                        });
                        return;
                    }
                    if ('items' in inventory!) {
                        if (inventory!.items.length > 0) {
                            Found.description = '';
                            inventory!.items.forEach((item) => {
                                Found.description += `\n${item}, `;
                            });
                            await interaction.reply({
                                embeds: [Found],
                                ephemeral: true,
                            });
                        } else {
                            await interaction.reply({
                                embeds: [
                                    Found.setDescription(`No items Found`),
                                ],
                                ephemeral: true,
                            });
                        }
                    } else {
                        await interaction.reply({
                            embeds: [Found.setDescription(`No items Found`)],
                            ephemeral: true,
                        });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'reset') {
            Inventory.findOne(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                null,
                async (err, inventory) => {
                    if (err) console.log(err);  
                    if (!inventory) {
                        await interaction.reply({
                            content: `You don't have any items`,
                            ephemeral: true,
                        });
                        return;
                    }
                })
            Inventory.findOneAndDelete(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                null,
                async (err) => {
                    if (err) console.log(err);
                    await interaction.reply({
                        content: `Your inventory has been reset`,
                        ephemeral: true,
                    });
                }
            );
        }
    },
};
