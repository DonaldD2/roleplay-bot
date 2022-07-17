import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Found from '../components/embeds/Inventory';
import userModel from '../models/user.model';

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
        if (interaction.inCachedGuild()) {
            if (interaction.options.getSubcommand() === 'add') {
                userModel
                    .findOne({
                        discordId: interaction.member?.id,
                    })
                    .then(async (dbUser) => {
                        if (dbUser) {
                            dbUser.items!.push(
                                interaction.options.getString('item') as string
                            );
                            await dbUser.save();
                            interaction.reply({
                                content: `Added ${interaction.options.getString(
                                    'item'
                                )} to your inventory`,
                                ephemeral: true,
                            });
                        }
                    });
            } else if (interaction.options.getSubcommand() === 'remove') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });

                if (dbUser) {
                    const item = interaction.options.getString(
                        'item'
                    ) as string;
                    const index = dbUser.items!.indexOf(item);
                    if (index > -1) {
                        dbUser.items!.splice(index, 1);
                        await dbUser.save();
                        interaction.reply({
                            content: `Removed ${item} from your inventory`,
                            ephemeral: true,
                        });
                    } else {
                        interaction.reply({
                            content: `You don't have ${item} in your inventory`,
                            ephemeral: true,
                        });
                    }
                }
            } else if (interaction.options.getSubcommand() === 'list') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });

                if (dbUser) {
                    interaction.reply({
                        embeds: [
                            Found.setDescription(dbUser.items!.join('\n')),
                        ], ephemeral: true,
                    });
                }
            } else if (interaction.options.getSubcommand() === 'reset') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });

                if (dbUser) {
                    dbUser.items = [];
                    await dbUser.save();
                    interaction.reply({
                        content: `Reset your inventory`,
                        ephemeral: true,
                    });
                }
            }
        }
    },
};
