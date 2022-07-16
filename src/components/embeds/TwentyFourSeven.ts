import { MessageEmbed } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';

export default async (interaction: CommandInteraction) => {
    if (interaction.inCachedGuild()) {
        const embed = new MessageEmbed()
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
        return embed;
    } else {
        return;
    }
};
