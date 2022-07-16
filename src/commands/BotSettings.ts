import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder, userMention } from '@discordjs/builders';
import userModel from '../models/user.model';
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
        if (interaction.inCachedGuild()) {
            if (interaction.options.getSubcommand() === 'verify-user') {
                const user = interaction.options.getUser('user');
                const dbUser = await userModel.findOne({
                    discordId: interaction.options.getUser('user')?.id,
                }).exec();
                if (dbUser?.verifiedServers.includes(interaction.guildId)) {
                    interaction.reply({
                        content: `${user!.username} is already verified`,
                        ephemeral: true,
                    });
                } else {
                    dbUser!.verifiedServers.push(interaction.guildId);
                    await dbUser!.save();
                    interaction.reply({
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
                if (!dbUser?.verifiedServers.includes(interaction.guildId)) {
                    interaction.reply({
                        content: `${user!.username} is not verified`,
                        ephemeral: true,
                    });
                } else {
                    dbUser!.verifiedServers = dbUser!.verifiedServers.filter(
                        (id) => id !== interaction.guildId
                    );
                    await dbUser!.save();
                    interaction.reply({
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
                    if (user.verifiedServers.includes(interaction.guildId)) {
                        verifiedUsers += `${user.discordId} - ${userMention(
                            user.discordId
                        )}\n`;
                    }
                });
                interaction.reply({
                    embeds: [VerifiedList.setDescription(verifiedUsers)],
                    ephemeral: true,
                });
            }
        }
    },
};
