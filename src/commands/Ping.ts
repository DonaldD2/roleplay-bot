import type { CommandInteraction } from 'discord.js';
import { bold, SlashCommandBuilder } from '@discordjs/builders';
import Ping from '../components/embeds/Ping';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Share your location with another user')
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user you are sharing your location with')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            await interaction.reply({
                embeds: [
                    Ping.setDescription(
                        `${bold(
                            interaction.member?.nickname as string
                        )} has pinged their location to ${bold(
                            interaction.options.getMember('user')!
                                .nickname as unknown as string
                        )}\n\nYou are now allowed to use your map to locate ${bold(
                            interaction.member?.nickname as string
                        )}`
                    ),
                ],
            });
        }
    },
};
