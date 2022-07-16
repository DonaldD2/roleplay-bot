import type { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Tweet from '../components/embeds/Tweet';
import userModel from '../models/user.model';

export = {
    data: new SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Twitter commands')
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('post')
                .setDescription('Post a tweet')
                .addStringOption((option) =>
                    option
                        .setName('content')
                        .setDescription('What you want to tweet')
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
                .setName('set-profile')
                .setDescription('Set your profile')
                .addStringOption((option) =>
                    option
                        .setName('username')
                        .setDescription('Your username you want')
                        .setRequired(false)
                )
                .addAttachmentOption((option) =>
                    option
                        .setName('image')
                        .setDescription('Your profile picture')
                        .setRequired(false)
                )
        ),

    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            if (interaction.options.getSubcommand() === 'post') {
                Tweet(
                    interaction,
                    interaction.options.getString('content') as string,
                    interaction.options.getAttachment('image')?.proxyURL
                ).then((embed) => {
                    interaction.channel
                        ?.send({
                            embeds: [embed as MessageEmbed],
                        })
                        .then(async (msg) => {
                            msg.react('<:like:995422257600016414>');
                            msg.react('<:retweet:995421485063745706>');
                        })
                        .then(() => {
                            interaction.reply({
                                content: 'Sent!',
                                ephemeral: true,
                            });
                        })
                        .then(() => {
                            if (
                                interaction.options
                                    .getString('content')
                                    ?.includes('<@')
                            ) {
                                interaction.options
                                    .getString('content')
                                    ?.split(' ')
                                    .forEach(async (user) => {
                                        /<@!?(\d+)>/.test(user)
                                            ? interaction.channel?.send(
                                                  `${user}`
                                              )
                                            : null;
                                    });
                            }
                        });
                });
            } else if (interaction.options.getSubcommand() === 'set-profile') {
                const username = interaction.options.getString(
                    'username'
                ) as string;
                const pfp =
                    interaction.options.getAttachment('image')?.proxyURL;
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (username) {
                    dbUser!.twitter!.username = username;
                }
                if (pfp) {
                    dbUser!.twitter!.pfp = pfp;
                }
                await dbUser!.save();
                if (!username && !pfp) {
                    dbUser!.twitter = {
                        username: '',
                        pfp: '',
                    };
                    await interaction.reply({
                        embeds: [
                            {
                                title: 'Profile reset',
                                description: `Your profile has been reset `,
                            },
                        ],
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        embeds: [
                            {
                                title: 'Profile Set',
                                description: `Your profile has been set to ${username}`,
                            },
                        ],
                        ephemeral: true,
                    });
                }
            }
        }
    },
};
