import { EmbedBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';

export default (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        return new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('911 - Incoming Call')
            .setThumbnail(
                'https://storage.needpix.com/rsynced_images/warning-sign-30915_1280.png'
            )
            .setDescription(
                `<@${interaction.member?.user.id}> ${bold(
                    'is calling 911'
                )}!\n\n${bold('Location: ')} ${interaction.options.getString(
                    'location'
                )}\n\n${bold(`Description: `)} ${interaction.options.getString(
                    'description'
                )}`
            )
            .setTimestamp();
    } else {
        return;
    }
};
