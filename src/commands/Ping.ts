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
        await interaction.reply({
            embeds: [
                Ping.setDescription(
                    `${bold(
                        //@ts-ignore
                        interaction.member?.nickname
                    )} has pinged their location to ${bold(
                        //@ts-ignore
                        interaction.options.getMember('user')!
                            .nickname as unknown as string
                    )}\n\nYou are now allowed to use your map to locate ${
                        //@ts-ignore
                        interaction.member?.nickname
                    }`
                ),
            ],
        });
    },
};
