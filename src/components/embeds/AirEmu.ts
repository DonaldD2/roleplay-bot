import { MessageEmbed } from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';

export default (interaction: CommandInteraction) => {
    return new MessageEmbed()
    .setColor('#dba31e')
    .setTitle('AirEmu')
    .setThumbnail('https://i.file.glass/heh5h.png')
    .setDescription(
        `AirEmu Flight Number ${bold(
            interaction.options.getNumber('flight-number') as unknown as string
        )} in ${bold(interaction.options.getString('location') as string)} is now ${bold(
            interaction.options.getString('status') as string
        )}!`
    )
    .setTimestamp();
}
