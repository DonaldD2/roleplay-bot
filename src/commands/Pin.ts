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
    .setName('pin')
    .setDescription('Pin someone to the floor!')
    .addUserOption((option) =>
        option
        .setName('target')
        .setDescription('Mention who you are pinning!')
        .setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
        const target = interaction.options.getMember('target');

        if(!target) return interaction.reply({content: "⚠️ | You have not pinged anyone!", ephemeral: true})
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setColor('#2e85c5')    
        .setDescription(`${bold(interaction.member?.nickname as unknown as string)} is pinning ${bold(interaction.options.getMember('target')?.nickname as unknown as string)} to the floor!`)

        interaction.reply({embeds: [embed]})
        interaction.channel.send({content: `${target}`})
       
    }},

};
