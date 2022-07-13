import { MessageEmbed } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { commands } from '..';

export = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows a list of commands')
        .addStringOption((option) =>
            option
                .setName('command')
                .setDescription('Command to search for')
                .setRequired(false)
        ),
    async execute(interaction: CommandInteraction) {
        let avatar: string | null | undefined = interaction.member?.user.avatar;
        //@ts-ignore
        let userID: string | null = interaction.member?.id;
        //@ts-ignore
        let author: string | null = interaction.member?.user.tag;

        const main: MessageEmbed = new MessageEmbed()
            .setColor('#004cff')
            .setAuthor({
                name: `${author}`,
                iconURL: `https://cdn.discordapp.com/avatars/${userID}/${avatar}.webp?size=256`,
            })
            .setTitle('Command List')
            .setFooter({ text: 'Page 1/3' })
            .setTimestamp();

        const main2: MessageEmbed = new MessageEmbed()
            .setColor('#004cff')
            .setAuthor({
                name: `${author}`,
                iconURL: `https://cdn.discordapp.com/avatars/${userID}/${avatar}.webp?size=256`,
            })
            .setTitle('Command List')
            .setFooter({ text: 'Page 2/3' })
            .setTimestamp();

        const main3: MessageEmbed = new MessageEmbed()
            .setColor('#004cff')
            .setAuthor({
                name: `${author}`,
                iconURL: `https://cdn.discordapp.com/avatars/${userID}/${avatar}.webp?size=256`,
            })
            .setTitle('Command List')
            .setFooter({ text: 'Page 3/3' })
            .setTimestamp();

        for (let i = 0; i < commands.length; i++) {
            main.addField(commands[i].name, commands[i].description, true);
        }
        for (let i = 25; i < commands.length; i++) {
            main2.addField(commands[i].name, commands[i].description, true);
        }
        for (let i = 50; i < commands.length; i++) {
            main3.addField(commands[i].name, commands[i].description, true);
        }
        if (interaction.options.getString('command')) {
            const cmdsearch = interaction.options.getString('command');
            const command = commands.find((c: any) => cmdsearch == c.name);
            const Search: MessageEmbed = new MessageEmbed()
                .setColor('#004cff')
                .setAuthor({
                    name: `${author}`,
                    iconURL: `https://cdn.discordapp.com/avatars/${userID}/${avatar}.webp?size=256`,
                })
                .addField(command.name, command.description, true)
                .setFooter({ text: 'Command Search' })
                .setTimestamp();

            const Error: MessageEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setAuthor({
                    name: `${author}`,
                    iconURL: `https://cdn.discordapp.com/avatars/${userID}/${avatar}.webp?size=256`,
                })
                .setTitle(`Command name ${cmdsearch} not found.`)
                .setFooter({ text: 'Command Search' })
                .setTimestamp();

            if (!command) {
                await interaction.reply({ embeds: [Error], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [Search], ephemeral: true });
            }
        } else {
            await interaction.reply({
                embeds: [main, main2, main3],
                ephemeral: true,
            });
        }
    },
};
