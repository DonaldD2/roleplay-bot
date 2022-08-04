import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import { unZiptied, unZiptyping } from '../components/embeds/Unziptie';
import { setTimeout } from 'node:timers/promises';

export = {
    data: new SlashCommandBuilder()
        .setName('un-ziptie')
        .setDescription('Removes zipties from a user')
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to ziptie')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction<'cached'>) {
        await interaction.reply({ embeds: [unZiptyping] });
        await setTimeout(1500);
        await interaction.editReply({
            embeds: [
                unZiptied.setDescription(
                    `${bold(
                        interaction.member?.nickname as unknown as string
                    )} unziptied ${bold(
                        interaction.options.getMember('user')
                            ?.nickname as unknown as string
                    )}!`
                ),
            ],
        });
    },
};
