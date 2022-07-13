import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import { unCuffed, unCuffing } from '../components/embeds/UnCuff';
import { setTimeout } from 'node:timers/promises';

export = {
    data: new SlashCommandBuilder()
        .setName('un-cuff')
        .setDescription('Removes handcuffs from a user')
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to cuff')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ embeds: [unCuffing] });
        await setTimeout(3000);
        await interaction.editReply({
            embeds: [
                unCuffed.setDescription(
                    `${bold(
                        interaction.member as unknown as string
                    )} uncuffed ${bold(
                        interaction.options.getMember(
                            'user'
                        ) as unknown as string
                    )}!`
                ),
            ],
        });
    },
};
