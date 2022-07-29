import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder, userMention } from '@discordjs/builders';
import userModel from '../models/user.model';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import {
    Verified,
    VerifiedList,
    UnVerified,
    RoleSet,
} from '../components/embeds/BotSettings';
import serverModel from '../models/server.model';

export = {
    data: new SlashCommandBuilder()
        .setName('bot-settings')
        .setDescription('Bot Settings for the server admins only')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('twitter-settings')
                .setDescription('Twitter Settings')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('verify-user')
                        .setDescription('Verify a user in your server')
                        .addUserOption((option) =>
                            option
                                .setName('user')
                                .setDescription('The user to verify')
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('unverify-user')
                        .setDescription('Unverify a user in your server')
                        .addUserOption((option) =>
                            option
                                .setName('user')
                                .setDescription('The user to unverify')
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('get-verified-users')
                        .setDescription('Get all verified users in your server')
                )
        )
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('911-settings')
                .setDescription('911 Settings')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('911-role')
                        .setDescription('Set the 911 role')
                        .addRoleOption((option) =>
                            option
                                .setName('role')
                                .setDescription('The role to set')
                                .setRequired(true)
                        )
                )
        ),

    async execute(interaction: CommandInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.inCachedGuild()) {
                if (interaction.options.getSubcommand() === 'verify-user') {
                    const user = interaction.options.getUser('user');
                    const dbUser = await userModel
                        .findOne({
                            discordId: interaction.options.getUser('user')?.id,
                        })
                        .exec();
                    if (
                        dbUser?.verifiedServers!.includes(interaction.guildId)
                    ) {
                        await interaction.reply({
                            content: `${user!.username} is already verified`,
                            ephemeral: true,
                        });
                    } else {
                        dbUser!.verifiedServers!.push(interaction.guildId);
                        await dbUser!.save();
                        await interaction.reply({
                            embeds: [
                                Verified.setDescription(
                                    `${user!.username} is now verified`
                                ),
                            ],
                            ephemeral: true,
                        });
                    }
                } else if (
                    interaction.options.getSubcommand() === 'unverify-user'
                ) {
                    const user = interaction.options.getUser('user');
                    const dbUser = await userModel.findOne({
                        discordId: interaction.options.getUser('user')?.id,
                    });
                    if (
                        !dbUser?.verifiedServers!.includes(interaction.guildId)
                    ) {
                        await interaction.reply({
                            content: `${user!.username} is not verified`,
                            ephemeral: true,
                        });
                    } else {
                        dbUser!.verifiedServers =
                            dbUser!.verifiedServers!.filter(
                                (id) => id !== interaction.guildId
                            );
                        await dbUser!.save();
                        await interaction.reply({
                            embeds: [
                                UnVerified.setDescription(
                                    `${user!.username} is now unverified`
                                ),
                            ],
                            ephemeral: true,
                        });
                    }
                } else if (
                    interaction.options.getSubcommand() === 'get-verified-users'
                ) {
                    const dbUser = await userModel.find(undefined);
                    let verifiedUsers = '';
                    dbUser.forEach(async (user) => {
                        if (
                            user.verifiedServers!.includes(interaction.guildId)
                        ) {
                            verifiedUsers += `${user.discordId} - ${userMention(
                                user.discordId
                            )}\n`;
                        }
                    });
                    if (verifiedUsers === '') {
                        await interaction.reply({
                            embeds: [
                                VerifiedList.setDescription(
                                    `No verified users in this server`
                                ),
                            ],
                            ephemeral: true,
                        });
                    } else {
                        await interaction.reply({
                            embeds: [
                                VerifiedList.setDescription(verifiedUsers),
                            ],
                            ephemeral: true,
                        });
                    }
                } else if (interaction.options.getSubcommand() === '911-role') {
                    const role = interaction.options.getRole('role');
                    const dbServer = await serverModel.findOne({
                        serverId: interaction.guildId,
                    });
                    if (dbServer?.emergency_role === role?.id) {
                        return await interaction.reply({
                            content: `${role!.name} is already the 911 role`,
                            ephemeral: true,
                        });
                    }
                    dbServer!.emergency_role = role?.id;
                    await dbServer?.save();
                    await interaction.reply({
                        embeds: [
                            RoleSet.setDescription(
                                `${role?.name} is now the 911 role`
                            ),
                        ],
                        ephemeral: true,
                    });
                }
            }
        }
        return;
    },
};
