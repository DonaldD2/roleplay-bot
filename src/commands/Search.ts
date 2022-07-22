import type { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Found from '../components/embeds/Search';

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
            Found(interaction!).then((embed) => {
                interaction.editReply({
                    embeds: [embed as EmbedBuilder],
                });
            });
    },
};
