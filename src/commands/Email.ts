import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import userModel from '../models/user.model';

import Email from '../components/embeds/Email';

export = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('Emails the mentioned user')
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('send')
                .setDescription('Send an email')
                .addStringOption((option) =>
                    option
                        .setName('to')
                        .setDescription('The email you want to send to')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('content')
                        .setDescription('What you want to email')
                        .setRequired(true)
                )
                .addAttachmentOption((option) =>
                    option
                        .setName('image')
                        .setDescription('Add an image')
                        .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('set-email')
                .setDescription('Set your email')
                .addStringOption((option) =>
                    option
                        .setName('email')
                        .setDescription('The email you want')
                        .setRequired(true)
                )
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            if (interaction.options.getSubcommand() === 'send') {
                if (interaction.options.getAttachment('image')) {
                    Email.setImage(
                        `${
                            interaction.options.getAttachment('image')?.proxyURL
                        }`
                    );
                }

                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });

                if (dbUser!.email) {
                    const sendTo = await userModel.findOne({
                        email: interaction.options.getString('to'),
                    });
                    interaction.client.users.cache
                        .get(sendTo!.discordId)
                        ?.send({ embeds: [Email] })
                        .then(async () => {
                            interaction.reply({
                                content: 'Email Sent!',
                                ephemeral: true,
                            });
                        });
                    await interaction.reply({
                        content: 'Sent!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'You have not set an email!',
                        ephemeral: true,
                    });
                }
            } else if (interaction.options.getSubcommand() === 'set-email') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.user.id,
                });
                dbUser!.email = interaction.options.getString(
                    'email'
                ) as string;
                await dbUser!.save();
                interaction.reply({
                    content: 'Email set!',
                    ephemeral: true,
                });
            }
        }
    },
};
