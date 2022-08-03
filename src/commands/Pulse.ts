import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    WebhookClient,
    SlashCommandBuilder,
    bold,
    GuildMember,
} from'discord.js';

import ms from 'ms';

import Pulse from '../components/embeds/Pulse';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pulse')
    .setDescription('Check someones pulse!')
    .addUserOption((option) =>
        option
        .setName('target')
        .setDescription('Mention whos pulse you are checking!')
        .setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
        const target = interaction.options.getMember('target');

        if(!target) return interaction.reply({content: "⚠️ | You have not pinged anyone!", ephemeral: true})

        interaction.reply({embeds: [
        Pulse.setColor('#2e85c5').setDescription(`${bold(interaction.member?.nickname as unknown as string)} is checking ${bold(interaction.options.getMember('target')?.nickname as unknown as string)} pulse!`)
        ],
    })
        interaction.channel.send({content: `${target}`})
       
    }},

};
