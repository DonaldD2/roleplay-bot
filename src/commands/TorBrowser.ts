import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Tor from '../components/embeds/Tor';
import { EmbedBuilder } from 'discord.js';

export = {
    data: new SlashCommandBuilder()
        .setName('tor')
        .setDescription('Sends a tor message')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('content')
                .setDescription('What you want to send')
                .setRequired(true)
        )
        .addAttachmentOption((option) =>
            option
                .setName('image')
                .setDescription('Add an image')
                .setRequired(false)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                Tor(
                    interaction,
                    interaction.options.getString('content') as string,
                    interaction.options.getAttachment('image')?.proxyURL
                ).then(async (embed) => {
                    await interaction.channel?.send({
                        embeds: [embed as EmbedBuilder],
                    });
                });
                if (interaction.options.getString('content')?.includes('<@')) {
                    interaction.options
                        .getString('content')
                        ?.split(' ')
                        .forEach((val) => {
                            /<@!?(\d+)>/.test(val)
                                ? interaction.channel?.send(`${val}`)
                                : null;
                        });
                }
                await interaction.reply({ content: 'Sent!', ephemeral: true });
            }
        }
    },
};
