import type { CommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import LifeInvader from '../components/embeds/LifeInvader';
import userModel from '../models/user.model';
import checkStringForUser from '../components/functions/checkStringForUser';

export = {
    data: new SlashCommandBuilder()
        .setName('life-invader')
        .setDescription('Life Invader commands')
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('post')
                .setDescription('Send a post')
                .addStringOption((option) =>
                    option
                        .setName('content')
                        .setDescription('What you want to post')
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
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                if (interaction.options.getSubcommand() === 'post') {
                    LifeInvader(
                        interaction,
                        interaction.options.getString('content') as string,
                        interaction.options.getAttachment('image')?.proxyURL
                    ).then((embed) => {
                        interaction.channel
                            ?.send({
                                embeds: [embed as EmbedBuilder],
                            })
                            .then(async (msg) => {
                                msg.react('<:like:995422257600016414>');
                                msg.react('<:liferepost:998031038938873951>');
                            })
                            .then(() => {
                                interaction.reply({
                                    content: 'Sent!',
                                    ephemeral: true,
                                });
                            })
                            .then(() => {
                                checkStringForUser(
                                    interaction,
                                    interaction.options.getString(
                                        'content'
                                    ) as string
                                );
                            });
                    });
                } else if (
                    interaction.options.getSubcommand() === 'set-profile'
                ) {
                    const username = interaction.options.getString(
                        'username'
                    ) as string;
                    const pfp =
                        interaction.options.getAttachment('image')?.proxyURL;
                    const dbUser = await userModel.findOne({
                        discordId: interaction.member?.id,
                    });
                    if (username) {
                        dbUser!.life!.username = username;
                    }
                    if (pfp) {
                        dbUser!.life!.pfp = pfp;
                    }
                    await dbUser!.save();
                    if (!username && !pfp) {
                        dbUser!.life = {
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
        }
    },
};
