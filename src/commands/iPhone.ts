import type { CommandInteraction } from 'discord.js';
import { bold, channelMention, SlashCommandBuilder } from '@discordjs/builders';
import Phone from '../models/Phone';
import Text from '../components/embeds/Text';
//@ts-ignore
import createMobilePhoneNumber from 'random-mobile-numbers';
import { Declined, Calling, Accepted } from '../components/embeds/Call';
import * as CallButtons from '../components/buttons/Call';

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
                        .setName('text')
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
        if (interaction.options.getSubcommand() === 'text') {
            Phone.findOne(
                { number: `${interaction.options.getString('number')}` },
                'discordId number contacts',
                async (err, phone) => {
                    if (err) console.log(err);
                    Text.setDescription(
                        `${interaction.options.getString('text')}`
                    );
                    Text.setAuthor({
                        name: 'Unknown Number',
                    });
                    if ('number' in phone!) {
                        Text.setAuthor({
                            name: phone.number,
                        });
                    }

                    if ('contacts' in phone!) {
                        if (phone!.contacts.length > 0) {
                            phone!.contacts.forEach((contact) => {
                                Phone.findOne(
                                    { discordId: interaction.user.id },
                                    null,
                                    (err, user) => {
                                        if (err) console.log(err);
                                        if (
                                            //@ts-ignore
                                            contact.number === user!.number
                                        ) {
                                            //@ts-ignore
                                            Text.setAuthor({
                                                name: contact.name,
                                            });
                                        }
                                    }
                                );
                            });
                        }
                    }
                    if (interaction.options.getAttachment('image')) {
                        Text.setImage(
                            `${
                                interaction.options.getAttachment('image')
                                    ?.proxyURL
                            }`
                        );
                    }

                    await interaction.client.users.cache
                        .get(phone!.discordId)
                        ?.send({ embeds: [Text] });
                    await interaction.reply({
                        content: 'Text Sent!',
                        ephemeral: true,
                    });
                }
            );
        } else if (interaction.options.getSubcommand() === 'new') {
            Phone.findOne(
                //@ts-ignore
                { discordId: `${interaction.member?.id}` },
                'number',
                async (err, phone) => {
                    if (phone) {
                        await interaction.reply({
                            content: 'You already have a phone number!',
                            ephemeral: true,
                        });
                    } else {
                        if (err) console.log(err);
                        const number = createMobilePhoneNumber('USA');
                        const newPhone = new Phone({
                            //@ts-ignore
                            discordId: `${interaction.member?.id}`,
                            number: `${number}`,
                        });
                        newPhone.save();
                        await interaction.reply({
                            content: `Your new phone number is ${number}`,
                            ephemeral: true,
                        });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'reset') {
            Phone.findOneAndRemove(
                { discordId: `${interaction.member?.user.id}` },
                null,
                (err) => {
                    if (err) console.log(err);
                }
            );
            await interaction.reply({
                content: `Your phone number has been reset`,
                ephemeral: true,
            });
        } else if (interaction.options.getSubcommand() === 'add') {
            Phone.findOne(
                { discordId: `${interaction.member?.user.id}` },
                'contacts',
                async (err, phone) => {
                    if (err) console.log(err);
                    if (!phone) {
                        await interaction.reply({
                            content: 'You do not have a phone number!',
                            ephemeral: true,
                        });
                        const newContact = {
                            name: interaction.options.getString('name'),
                            number: interaction.options.getString('number'),
                        };
                        //@ts-ignore
                        phone.contacts.push(newContact);
                        await phone!.save();
                        await interaction.reply({
                            content: `Contact added!`,
                            ephemeral: true,
                        });
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'remove') {
            Phone.findOne(
                { discordId: `${interaction.member?.user.id}` },
                'contacts',
                async (err, phone) => {
                    if (err) console.log(err);
                    const contact = phone!.contacts.find(
                        (contact) =>
                            //@ts-ignore
                            contact.number ===
                            interaction.options.getString('number')
                    );
                    phone!.contacts.splice(
                        //@ts-ignore
                        phone.contacts.indexOf(contact)
                    );
                    await phone!.save();
                    await interaction.reply({
                        content: `Contact removed!`,
                        ephemeral: true,
                    });
                }
            );
        } else if (interaction.options.getSubcommand() === 'list') {
            Phone.findOne(
                { discordId: `${interaction.member?.user.id}` },
                'contacts',
                async (err, phone) => {
                    if (err) console.log(err);
                    let contacts = '';
                    if ('contacts' in phone!) {
                        if (phone!.contacts.length > 0) {
                            phone!.contacts.forEach((contact) => {
                                contacts += `${contact.name}: ${contact.number}\n`;
                            });
                            await interaction.reply({
                                embeds: [
                                    {
                                        title: 'Contacts',
                                        description: `${contacts}`,
                                    },
                                ],
                                ephemeral: true,
                            });
                        } else {
                            await interaction.reply({
                                content: `You have no contacts!`,
                                ephemeral: true,
                            });
                        }
                    }
                }
            );
        } else if (interaction.options.getSubcommand() === 'get-number') {
            Phone.findOne(
                { discordId: `${interaction.member?.user.id}` },
                'number',
                async (err, phone) => {
                    if (err) console.log(err);
                    await interaction.reply({
                        content: `Your phone number is ${phone!.number}`,
                        ephemeral: true,
                    });
                }
            );
        } else if (interaction.options.getSubcommand() === 'call') {
            //@ts-ignore
            if (!interaction.member?.voice.channelId) {
                return await interaction.reply({
                    content:
                        'Please join a voice channel before using this command.',
                    ephemeral: true,
                });
            }
            //@ts-ignore
            if (!interaction.options.getMember('user').voice.channelId) {
                return await interaction.reply({
                    content:
                        'Both users must be in a voice channel before using this command.',
                    ephemeral: true,
                });
            }
            if (
                interaction.options.getMember('user') === interaction.member ||
                //@ts-ignore
                interaction.options.getMember('user')?.id ===
                    '881241382184972351'
            ) {
                return await interaction.reply({
                    embeds: [Declined],
                    ephemeral: true,
                });
            }

            await interaction.reply({
                embeds: [
                    Calling.setDescription(
                        `<a:telephone:858107183308603393> ${bold(
                            interaction.options.getMember(
                                'user'
                            ) as unknown as string
                        )} you are getting a call from ${bold(
                            interaction.member as unknown as string
                        )} in ${channelMention(
                            //@ts-ignore
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
                        //@ts-ignore
                        i.user.id === interaction.options.getMember('user')?.id
                    ) {
                        //@ts-ignore
                        interaction.options.getMember('user').voice.setChannel(
                            //@ts-ignore
                            interaction.member?.voice.channel
                        );
                        await interaction.editReply({
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
                        //@ts-ignore
                        interaction.options.getMember('user')?.id
                    ) {
                        //@ts-ignore
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
                    //@ts-ignore
                    interaction.editReply({ embeds: [Declined] });
                }
            });
        }
    },
};
