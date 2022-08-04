import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
    bold,
} from 'discord.js';

import Pulse from '../components/embeds/Pulse';

export = {
    data: new SlashCommandBuilder()
        .setName('pulse')
        .setDescription('Check someones pulse!')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('Mention whos pulse you are checking!')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const target = interaction.options.getMember('target');

        if (!target)
            return interaction.reply({
                content: '⚠️ | You have not pinged anyone!',
                ephemeral: true,
            });

        await interaction.reply({
            embeds: [
                Pulse.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} is checking ${bold(
                        interaction.options.getMember('target')
                            ?.nickname as unknown as string
                    )} pulse!`
                ),
            ],
        });
        interaction.channel.send({ content: `${target}` });
    },
};
