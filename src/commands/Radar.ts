import {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    bold,
} from 'discord.js';

import ms from 'ms';

import Radar from '../components/embeds/Radar';

export = {
    data: new SlashCommandBuilder()
    .setName('radar')
    .setDescription('Set your radar speed or clock someone\'s speed!')
    .addSubcommand((subCommand) => subCommand.setName('set-speed').setDescription('Sets the speed of your radar').addNumberOption((option) => option.setName('speed').setDescription('Speed in MPH. Only the number!')))
    .addSubcommand((subCommand) => subCommand.setName('clock').setDescription('Clock someones speed').addUserOption((option) => option.setName('suspect').setDescription('Whos speed are you clocking?'))),

    async execute(interaction: ChatInputCommandInteraction) {
        if(interaction.isChatInputCommand()) {
            if(interaction.inCachedGuild()) {
                if(interaction.options.getSubcommand() === 'set-speed') {
                    interaction.reply({embeds: [
                        Radar.setColor('#2e85c5').setDescription(`${bold(interaction.member?.nickname as unknown as string)} has set their radar speed to ${interaction.options.getNumber('speed')} MPH!`)
                    ]})
                }

                if(interaction.options.getSubcommand() === 'clock') {
                    interaction.reply({embeds: [
                        Radar.setColor('#2e85c5').setColor('#2e85c5').setDescription(`${bold(interaction.member?.nickname as unknown as string)} is reading ${bold(interaction.options.getMember('target')?.nickname as unknown as string)}'s speed on their radar!`)
                    ]});
                };
            };
        };
    },
};
