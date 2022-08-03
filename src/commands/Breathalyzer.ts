import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    WebhookClient,
    SlashCommandBuilder,
    bold,
    GuildMember,
} from'discord.js';

import ms from 'ms';

import Breathalyzer from '../components/embeds/Breathalyzer';

export = {
    data: new SlashCommandBuilder()
    .setName('breathalyzer')
    .setDescription('Check someones breath to see if theyre Under The Influence!')
    .addUserOption((option) =>
        option
        .setName('target')
        .setDescription('Mention whos breath you are checking!')
        .setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
        const target = interaction.options.getMember('target');

        if(!target) return interaction.reply({content: "⚠️ | You have not pinged anyone!", ephemeral: true})

        interaction.reply({embeds: [
            Breathalyzer.setColor('#2e85c5').setDescription(`${bold(interaction.member?.nickname as unknown as string)} placed a breathalyzer in ${bold(interaction.options.getMember('target')?.nickname as unknown as string)}'s mouth, What does it read?`)
        ],
    })
        interaction.channel.send({content: `${target}`})
       
    }},

};
