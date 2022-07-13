import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Server from '../models/Server';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import {
    Verified,
    VerifiedList,
    UnVerified,
} from '../components/embeds/BotSettings';

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
        ),

    async execute(interaction: CommandInteraction) {
        if (interaction.options.getSubcommand() === 'verify-user') {
            const user = interaction.options.getUser('user');
            const server = await Server.findOne({
                where: {
                    serverId: interaction.guild?.id,
                },
            });
            if (server!.verifiedUsers.includes(user!.id)) {
                await interaction.reply({content:
                    `${user!.username} is already verified`
                , ephemeral: true});
                return;
            }
            server?.verifiedUsers.push(user?.id as string);
            await server?.save();
            await interaction.reply({
                embeds: [
                    Verified.setDescription(
                        `${user?.username} has been verified`
                    ),
                ],
                ephemeral: true,
            });
        } else if (interaction.options.getSubcommand() === 'unverify-user') {
            const user = interaction.options.getUser('user');
            const server = await Server.findOne({
                where: {
                    serverId: interaction.guild?.id,
                },
            });
            if (!server!.verifiedUsers.includes(user!.id)) {
                await interaction.reply({content: `${user!.username} is not verified`, ephemeral: true});
                return;
            }
            server?.verifiedUsers.splice(
                server?.verifiedUsers.indexOf(user?.id as string),
                1
            );
            await server?.save();
            await interaction.reply({
                embeds: [
                    UnVerified.setDescription(
                        `${user?.username} has been un-verified`
                    ),
                ],
                ephemeral: true,
            });
        } else if (
            interaction.options.getSubcommand() === 'get-verified-users'
        ) {
            const server = await Server.findOne({
                where: {
                    serverId: interaction.guild?.id,
                },
            });
            const verifiedUsers: string[] = server?.verifiedUsers as string[];
            const verifiedUsersString: string = verifiedUsers
                ?.map((user) => `<@${user}>`)
                .join(', ');
            await interaction.reply({
                embeds: [VerifiedList.setDescription(verifiedUsersString)],
                ephemeral: true,
            });
        }
    },
};
