import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
    bold,
} from 'discord.js';

import Injuries from '../components/embeds/Injuries';

export = {
    data: new SlashCommandBuilder()
        .setName('injuries')
        .setDescription('Check someones injuries!')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('Mention whos injuries you are checking!')
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
                Injuries.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} is checking ${bold(
                        interaction.options.getMember('target')
                            ?.nickname as unknown as string
                    )} for injuries!`
                ),
            ],
        });
        interaction.channel.send({ content: `${target}` });
    },
};
