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
    .setName('grab')
    .setDescription('Grab someone!')
    .addUserOption((option) =>
        option
        .setName('target')
        .setDescription('Mention who you are grabbing!')
        .setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.inCachedGuild()) {
        const target = interaction.options.getMember('target');

        if(!target) return interaction.reply({content: "⚠️ | You have not pinged anyone!", ephemeral: true})
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setColor('#2e85c5')    
        .setDescription(`${bold(interaction.member?.nickname as unknown as string)} has grabbed ${bold(interaction.options.getMember('target')?.nickname as unknown as string)}!`)

        interaction.reply({embeds: [embed]})
        interaction.channel.send({content: `${target}`})
       
    }},

};