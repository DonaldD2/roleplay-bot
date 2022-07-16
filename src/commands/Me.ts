import type { CommandInteraction } from 'discord.js';
import { italic, SlashCommandBuilder } from '@discordjs/builders';
import Me from '../components/embeds/Me';

export = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription('Do a custom action')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('action')
                .setDescription('The action you are going to do')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.inCachedGuild()) {
            await interaction.reply({
                embeds: [
                    Me.setDescription(
                        `${italic(
                            interaction.options.getString('action') as string
                        )}`
                    ).setAuthor({
                        name: `${interaction.member?.nickname}`,
                        iconURL: `https://cdn.discordapp.com/avatars/${interaction.member?.id}/${interaction.member?.user.avatar}.webp?size=256`,
                    }),
                ],
            });
            if (interaction.options.getString('action')?.includes('<@')) {
                interaction.options
                    .getString('action')
                    ?.split(' ')
                    .forEach((val) => {
                        /<@!?(\d+)>/.test(val)
                            ? interaction.channel?.send(`${val}`)
                            : null;
                    });
            }
        }
    },
};
