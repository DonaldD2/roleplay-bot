import type { CommandInteraction, EmbedAuthorData } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Tweet from '../components/embeds/Tweet';
import Server from '../models/Server';
import Twitter from '../models/Twitter';

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
        if (interaction.options.getSubcommand() === 'post') {
            if (interaction.options.getAttachment('image'))
                Tweet.setImage(
                    `${interaction.options.getAttachment('image')?.proxyURL}`
                );
            Server.findOne(
                { serverId: interaction.guild?.id },
                'verifiedUsers',
                (err, server) => {
                    if (err) {
                        console.log(err);
                    } else {
                        server?.verifiedUsers.forEach(async (user) => {
                            //@ts-ignore
                            if (user === interaction.member?.id) {
                                Tweet.setTitle(
                                    '<:verified:869045206857711657> TWOTTER'
                                );
                            }
                        });
                    }
                }
            );
            const author: EmbedAuthorData = {
                name: interaction.user.username,
                iconURL: interaction.user.avatarURL() as string,
            };
            Twitter.findOne(
                { discordId: interaction.user.id },
                'username pfp',
                async (err, server) => {
                    if (err) {
                        console.log(err);
                    } else if (!server) {
                        const newTwitter = new Twitter({
                            discordId: interaction.user.id,
                            //@ts-ignore
                            username: interaction.member?.nickname,
                            pfp: interaction.user.avatarURL(),
                        });
                        newTwitter.save();
                    } else {
                        if ('pfp' in server) {
                            author.iconURL = server.pfp;
                        }
                        if ('username' in server) {
                            author.name = server.username;
                        }
                        await interaction.channel
                            ?.send({
                                embeds: [
                                    Tweet.setDescription(
                                        `${interaction.options.getString(
                                            'content'
                                        )}`
                                    ).setAuthor(author),
                                ],
                            })
                            .then(async (msg) => {
                                await interaction.reply({
                                    content: 'Sent!',
                                    ephemeral: true,
                                });
                                msg.react('<:like:995422257600016414>');
                                // msg.react('<:retweet:995421485063745706>');
                                Tweet.setImage('');
                            })
                            .then(async () => {
                                if (
                                    interaction.options
                                        .getString('content')
                                        ?.includes('<@')
                                ) {
                                    interaction.options
                                        .getString('content')
                                        ?.split(' ')
                                        .forEach(async (val) => {
                                            /<@!?(\d+)>/.test(val)
                                                ? await interaction.channel?.send(
                                                      `${val}`
                                                  )
                                                : null;
                                        });
                                }
                            });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'set-profile') {
            const username = interaction.options.getString('username');
            const pfp = interaction.options.getAttachment('image');
            Twitter.findOne(
                { discordId: interaction.user.id },
                'username pfp',
                (err, server) => {
                    if (err) {
                        console.log(err);
                    } else if (!server) {
                        const newTwitter = new Twitter({
                            discordId: interaction.user.id,
                            username:
                                username ||
                                //@ts-ignore
                                interaction.member?.nickname ||
                                interaction.user.username,
                            pfp: pfp?.proxyURL || interaction.user.avatarURL(),
                        });
                        newTwitter.save();
                    } else {
                        server.username =
                            //@ts-ignore
                            username || interaction.member?.nickname;
                        server.pfp =
                            pfp?.proxyURL ||
                            (interaction.user.avatarURL() as string);
                        server?.save();
                    }
                }
            );
            if (!username && !pfp) {
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
    },
};
