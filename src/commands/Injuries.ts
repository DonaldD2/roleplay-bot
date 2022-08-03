import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    WebhookClient,
    SlashCommandBuilder,
    bold,
    GuildMember,
} from'discord.js';
import ms from 'ms';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('injuries')
    .setDescription('Check someones injuries!')
    .addUserOption((option) =>
        option
        .setName('target')
        .setDescription('Mention whos injuries you are checking!')
        .setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
        const target = interaction.options.getMember('target');

        if(!target) return interaction.reply({content: "⚠️ | You have not pinged anyone!", ephemeral: true})
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setColor('#2e85c5')    
        .setDescription(`${bold(interaction.member?.nickname as unknown as string)} is checking ${bold(interaction.options.getMember('target')?.nickname as unknown as string)} for injuries!`)

        interaction.reply({embeds: [embed]})
        interaction.channel.send({content: `${target}`})
       
    }},

};
