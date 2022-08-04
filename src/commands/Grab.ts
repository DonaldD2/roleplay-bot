import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
    bold,
} from 'discord.js';

import Grab from '../components/embeds/Grab';

export = {
    data: new SlashCommandBuilder()
        .setName('grab')
        .setDescription('Grab someone!')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('Mention who you are grabbing!')
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
                Grab.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} has grabbed ${bold(
                        interaction.options.getMember('target')
                            ?.nickname as unknown as string
                    )}!`
                ),
            ],
        });
        interaction.channel.send({ content: `${target}` });
    },
};
