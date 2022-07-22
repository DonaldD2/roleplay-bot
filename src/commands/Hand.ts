import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Handed from '../components/embeds/Hand';

export = {
    data: new SlashCommandBuilder()
        .setName('hand')
        .setDescription('Hand an item to a user')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('item')
                .setDescription('The user to search')
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to search')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                Handed(interaction!).then(() => {
                    interaction.client.users.cache
                        .get(
                            interaction.options.getMember('user')?.id as string
                        )
                        ?.send({
                            content: `${
                                interaction.user.username
                            } handed you a ${interaction.options.getString(
                                'item'
                            )}`,
                        })
                        .then(async () => {
                            await interaction.reply({
                                content: 'Handed!',
                                ephemeral: true,
                            });
                        });
                });
            }
        }
    },
};
