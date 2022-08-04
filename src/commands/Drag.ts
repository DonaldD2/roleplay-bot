import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
    bold,
} from 'discord.js';

import Drag from '../components/embeds/Drag';

export = {
    data: new SlashCommandBuilder()
        .setName('drag')
        .setDescription('Drag someone!')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('Mention who you are dragging!')
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
                Drag.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} is dragging ${bold(
                        interaction.options.getMember('target')
                            ?.nickname as unknown as string
                    )}!`
                ),
            ],
        });
        interaction.channel.send({ content: `${target}` });
    },
};
