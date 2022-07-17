import { CommandInteraction } from 'discord.js';
import { bold, channelMention, SlashCommandBuilder } from '@discordjs/builders';
import Text from '../components/embeds/Text';
//@ts-ignore
import createMobilePhoneNumber from 'random-mobile-numbers';
import { Declined, Calling, Accepted } from '../components/embeds/Call';
import * as CallButtons from '../components/buttons/Call';
import userModel from '../models/user.model';

export = {
    data: new SlashCommandBuilder()
        .setName('iphone')
        .setDescription('iPhone Device Commands')
        .setDMPermission(false)
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('actions')
                .setDescription('iPhone action commands')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('text-number')
                        .setDescription('Text a number')
                        .addStringOption((option) =>
                            option
                                .setName('number')
                                .setDescription('The number you want to text')
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option
                                .setName('text')
                                .setDescription('The text you want to send')
                                .setRequired(true)
                        )
                        .addAttachmentOption((option) =>
                            option
                                .setName('image')
                                .setDescription('An image you want to send')
                                .setRequired(false)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('text-contact')
                        .setDescription('Text a contact')
                        .addStringOption((option) =>
                            option
                                .setName('comtact')
                                .setDescription('The contact you want to text')
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option
                                .setName('text')
                                .setDescription('The text you want to send')
                                .setRequired(true)
                        )
                        .addAttachmentOption((option) =>
                            option
                                .setName('image')
                                .setDescription('An image you want to send')
                                .setRequired(false)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('call')
                        .setDescription('Call a number')
                        .addUserOption((option) =>
                            option
                                .setName('user')
                                .setDescription('The user you want to call')
                                .setRequired(true)
                        )
                )
        )
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('number')
                .setDescription('Number commands')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('new')
                        .setDescription('Get a new phone number')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('reset')
                        .setDescription('Reset your phone number')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('get')
                        .setDescription('Get your current phone number')
                )
        )

        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('contacts')
                .setDescription('Contacts Commands')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('add')
                        .setDescription('Add a contact')
                        .addStringOption((option) =>
                            option
                                .setName('name')
                                .setDescription('The name of the contact')
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option
                                .setName('number')
                                .setDescription('The number of the contact')
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('remove')
                        .setDescription('Remove a contact')
                        .addStringOption((option) =>
                            option
                                .setName('number')
                                .setDescription('The number of the contact')
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('list')
                        .setDescription('List your contacts')
                )
        ),

    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            if (interaction.options.getSubcommand() === 'text-number') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                Text.setDescription(`${interaction.options.getString('text')}`);
                Text.setAuthor({
                    name: 'Unknown Number',
                });
                if (dbUser!.number) {
                    Text.setAuthor({
                        name: `${dbUser!.number}`,
                    });
                }
                if (interaction.options.getAttachment('image')) {
                    Text.setImage(
                        `${
                            interaction.options.getAttachment('image')?.proxyURL
                        }`
                    );
                }
                const sendTo = await userModel.findOne({
                    number: interaction.options.getString('number'),
                });
                if (sendTo) {
                    sendTo.contacts!.forEach((contact) => {
                        if (contact.number === dbUser!.number) {
                            Text.setAuthor({
                                name: `${contact.name}`,
                            });
                        }
                    });
                    interaction.client.users.cache
                        .get(sendTo.discordId)
                        ?.send({ embeds: [Text] })
                        .then(async () => {
                            interaction.reply({
                                content: 'Text Sent!',
                                ephemeral: true,
                            });
                        });
                } else {
                    interaction.reply({ content: 'Number not found' });
                }
            } else if (interaction.options.getSubcommand() === 'text-contact') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                Text.setDescription(`${interaction.options.getString('text')}`);
                Text.setAuthor({
                    name: 'Unknown Number',
                });
                if (dbUser!.number) {
                    Text.setAuthor({
                        name: `${dbUser!.number}`,
                    });
                }
                if (interaction.options.getAttachment('image')) {
                    Text.setImage(
                        `${
                            interaction.options.getAttachment('image')?.proxyURL
                        }`
                    );
                }
                dbUser!.contacts!.forEach(async (contact) => {
                    if (
                        contact.number ===
                        interaction.options.getString('contact')
                    ) {
                        const sendTo = await userModel.findOne({
                            number: interaction.options.getString('contact'),
                        });
                        if (sendTo) {
                            sendTo.contacts!.forEach((contact) => {
                                if (contact.number === dbUser!.number) {
                                    Text.setAuthor({
                                        name: `${contact.name}`,
                                    });
                                }
                            });
                            interaction.client.users.cache
                                .get(sendTo.discordId)
                                ?.send({ embeds: [Text] })
                                .then(async () => {
                                    interaction.reply({
                                        content: 'Text Sent!',
                                        ephemeral: true,
                                    });
                                });
                        } else {
                            interaction.reply({
                                content: 'Contact not found',
                                ephemeral: true,
                            });
                        }
                    }
                });
            } else if (interaction.options.getSubcommand() === 'new') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (dbUser!.number) {
                    interaction.reply({
                        content: 'You already have a number!',
                        ephemeral: true,
                    });
                } else {
                    const number = createMobilePhoneNumber('USA');
                    dbUser!.number = number;
                    await dbUser!.save();
                    interaction.reply({
                        content: `Your new number is ${number}`,
                        ephemeral: true,
                    });
                }
            } else if (interaction.options.getSubcommand() === 'reset') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (!dbUser!.number) {
                    interaction.reply({
                        content: "You don't have a number!",
                        ephemeral: true,
                    });
                } else {
                    dbUser!.number = '';
                    await dbUser!.save();
                    interaction.reply({
                        content: 'Your number has been reset!',
                        ephemeral: true,
                    });
                }
            } else if (interaction.options.getSubcommand() === 'add') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                const contact = {
                    name: interaction.options.getString('name') as string,
                    number: interaction.options.getString('number') as string,
                };
                dbUser!.contacts!.push(contact);
                await dbUser!.save();
                interaction.reply({
                    content: 'Contact added!',
                    ephemeral: true,
                });
            } else if (interaction.options.getSubcommand() === 'remove') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (!dbUser!.number) {
                    interaction.reply({
                        content: "You don't have a number!",
                        ephemeral: true,
                    });
                } else {
                    const contact = dbUser!.contacts!.find(
                        (contact) =>
                            contact.number ===
                            (interaction.options.getString('number') as string)
                    );
                    if (contact) {
                        dbUser!.contacts!.splice(
                            dbUser!.contacts!.indexOf(contact),
                            1
                        );
                        await dbUser!.save();
                        interaction.reply({
                            content: 'Contact removed!',
                            ephemeral: true,
                        });
                    } else {
                        interaction.reply({
                            content: 'Contact not found!',
                            ephemeral: true,
                        });
                    }
                }
            } else if (interaction.options.getSubcommand() === 'list') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (dbUser!.contacts!.length < 1) {
                    return interaction.reply({
                        content: 'You have no contacts!',
                        ephemeral: true,
                    });
                }

                const contactList = dbUser!.contacts!.map((contact) => {
                    if (contact.number != undefined)
                        `${contact.name} - ${contact.number}`;
                });
                interaction.reply({
                    content: `Your contacts are: ${contactList.join('\n')}`,
                    ephemeral: true,
                });
            } else if (interaction.options.getSubcommand() === 'get') {
                const dbUser = await userModel.findOne({
                    discordId: interaction.member?.id,
                });
                if (!dbUser!.number) {
                    interaction.reply({
                        content: "You don't have a number!",
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content: `Your number is ${dbUser!.number}`,
                        ephemeral: true,
                    });
                }
            } else if (interaction.options.getSubcommand() === 'call') {
                if (!interaction.member?.voice.channelId) {
                    return interaction.reply({
                        content:
                            'Please join a voice channel before using this command.',
                        ephemeral: true,
                    });
                }
                if (!interaction.options.getMember('user')!.voice.channelId) {
                    return interaction.reply({
                        content:
                            'Both users must be in a voice channel before using this command.',
                        ephemeral: true,
                    });
                }
                if (
                    interaction.options.getMember('user') ===
                        interaction.member ||
                    interaction.options.getMember('user')?.id ===
                        '881241382184972351'
                ) {
                    return interaction.reply({
                        embeds: [Declined],
                        ephemeral: true,
                    });
                }

                interaction.reply({
                    embeds: [
                        Calling.setDescription(
                            `<a:telephone:858107183308603393> ${bold(
                                interaction.options.getMember(
                                    'user'
                                ) as unknown as string
                            )} you are getting a call from ${bold(
                                interaction.member as unknown as string
                            )} in ${channelMention(
                                interaction.member?.voice.channelId
                            )}\nPress ${bold('Accept')} to join`
                        ),
                    ],
                    components: [CallButtons.default],
                });
                const collector =
                    interaction.channel?.createMessageComponentCollector({
                        componentType: 'BUTTON',
                        time: 15000,
                    });

                collector?.on('collect', async (i) => {
                    if (i.customId === 'accept') {
                        if (
                            i.user.id ===
                            interaction.options.getMember('user')?.id
                        ) {
                            interaction.options
                                .getMember('user')!
                                .voice.setChannel(
                                    interaction.member?.voice.channel
                                );
                            interaction.editReply({
                                embeds: [Accepted],
                            });
                        } else {
                            interaction.followUp({
                                content: 'You cannot accept this call.',
                                ephemeral: true,
                            });
                        }
                    } else {
                        if (
                            i.user.id ===
                            interaction.options.getMember('user')?.id
                        ) {
                            interaction.editReply({ embeds: [Declined] });
                        } else {
                            interaction.followUp({
                                content: 'You cannot decline this call.',
                                ephemeral: true,
                            });
                        }
                    }
                });

                collector?.on('end', (collected) => {
                    if (collected.size === 0) {
                        interaction.editReply({ embeds: [Declined] });
                    }
                });
            }
        }
    },
};
