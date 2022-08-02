import type {CommandInteraction} from 'discord.js';
import {EmbedBuilder} from 'discord.js';
import {bold} from '@discordjs/builders';

export default async (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.inCachedGuild()) {
            return new EmbedBuilder()
                .setColor('#0db14b')
                .setTitle('24/7')
                .setThumbnail('https://i.file.glass/0eg7f.png')
                .setDescription(
                    `The 24/7 in ${bold(
                        interaction.options.getString('location') as string
                    )} is now ${bold(
                        interaction.options.getString('status') as string
                    )}!`
                )
                .setTimestamp();
        } else {
            return;
        }
    } else {
        return;
    }
};
