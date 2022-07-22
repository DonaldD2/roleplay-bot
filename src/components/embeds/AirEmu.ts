import { EmbedBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';

export default (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        return new EmbedBuilder()
            .setColor('#dba31e')
            .setTitle('AirEmu')
            .setThumbnail('https://i.file.glass/heh5h.png')
            .setDescription(
                `AirEmu Flight Number ${bold(
                    interaction.options.getString(
                        'flight-number'
                    ) as unknown as string
                )} in ${bold(
                    interaction.options.getString('location') as string
                )} is now ${bold(
                    interaction.options.getString('status') as string
                )}!`
            )
            .setTimestamp();
    } else {
        return;
    }
};
