import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import { Cuffed, Cuffing } from '../components/embeds/Cuff';
import { setTimeout } from 'node:timers/promises';
import checkStringForUser from '../components/functions/checkStringForUser';

export = {
    data: new SlashCommandBuilder()
        .setName('cuff')
        .setDescription('Applies handcuffs to a user')
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to cuff')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            await interaction.reply({ embeds: [Cuffing] });
            await setTimeout(1500);
            interaction.editReply({
                embeds: [
                    Cuffed.setDescription(
                        `${bold(
                            interaction.member?.nickname as unknown as string
                        )} cuffed ${bold(
                            interaction.options.getMember('user')
                                ?.nickname as unknown as string
                        )}!`
                    ),
                ],
            });
            checkStringForUser(
                interaction,
                interaction.options.getMember('user') as unknown as string
            );
        }
    },
};
