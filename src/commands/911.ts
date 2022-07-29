import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import NineOneOne from '../components/embeds/911';
import serverModel from '../models/server.model';

export = {
    data: new SlashCommandBuilder()
        .setName('911')
        .setDescription('Call 911')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('description')
                .setDescription('The description of the call')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('The location of the call')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const dbServer = await serverModel.findOne({
            serverId: interaction.guildId,
        });
        await interaction
            .reply({
                embeds: [NineOneOne(interaction) as EmbedBuilder],
            })
            .then(async () => {
                if(dbServer?.emergency_role != '') {
                    interaction.channel?.send(`<@&${dbServer?.emergency_role}>`);
                }
                });
    },
};
