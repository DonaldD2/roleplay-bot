import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder, bold } from '@discordjs/builders';
import Search, { Found } from '../components/embeds/Search';
import Server from '../models/user.model';

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
        if (interaction.inCachedGuild()) {
            Search.description += bold(
                interaction.options.getMember('user')!.nickname as string
            );
            await interaction.reply({ embeds: [Search] });
            const dbUser = await Server.findOne({
                discordId: interaction.member.id,
            });
            if (dbUser!.items!.length === 0) {
                dbUser!.items!.forEach((item) => {
                    Found.description += `${item}\n`;
                });
                await interaction.editReply({ embeds: [Found] });
            } else {
                Found.description += `No Items Found`;
                await interaction.editReply({ embeds: [Found] });
            }
        }
    },
};
