import { EmbedBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

export default async (
    interaction: CommandInteraction,
    content: string,
    image?: string
) => {
    if (interaction.inCachedGuild()) {
        const embed = new EmbedBuilder()
            .setColor('#7D4698')
            .setAuthor({
                name: 'Anonymous',
                iconURL:
                    'https://archive.flossmanuals.net/tech-tools-for-activism/_booki/tech-tools-for-activism/static/anon_logo.png',
            })
            .setTitle('<:tor:869045322704371806> Tor Project')
            .setDescription(content)
            .setTimestamp();
        if (image) {
            embed.setImage(image);
        }
        return embed;
    } else {
        return;
    }
};
