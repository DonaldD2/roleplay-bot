import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
    bold,
} from 'discord.js';
import Pin from '../components/embeds/Pin';

export = {
    data: new SlashCommandBuilder()
        .setName('pin')
        .setDescription('Pin someone to the floor!')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('Mention who you are pinning!')
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
                Pin.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} is pinning ${bold(
                        interaction.options.getMember('target')
                            ?.nickname as unknown as string
                    )} to the floor!`
                ),
            ],
        });
        interaction.channel.send({ content: `${target}` });
    },
};
