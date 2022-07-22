import { EmbedBuilder } from 'discord.js';
import type { CommandInteraction, EmbedAuthorData } from 'discord.js';
import userModel from '../../models/user.model';

export default async (
    interaction: CommandInteraction,
    content: string,
    image?: string
) => {
    if (interaction.inCachedGuild()) {
        const dbUser = await userModel.findOne({
            discordId: interaction.member?.id,
        });
        const author: EmbedAuthorData = {
            name: interaction.member?.user.username,
            iconURL: interaction.user.avatarURL() as string,
        };
        if (interaction.member?.nickname) {
            author.name = interaction.member?.nickname;
        }
        if (dbUser!.twitter!.username != '') {
            author.name = dbUser!.twitter!.username as string;
        }
        if (dbUser!.twitter!.pfp != '') {
            author.iconURL = dbUser!.twitter!.pfp;
        }
        const embed = new EmbedBuilder()
            .setColor('#1d36f2')
            .setTitle('<:twitter:858110570087972884> TWITTER')
            .setDescription(content)
            .setAuthor(author)
            .setTimestamp();
        if (image) {
            embed.setImage(image);
        }
        if (dbUser?.verifiedServers!.includes(interaction.guildId as string)) {
            embed.setTitle('<:verified:869045206857711657> TWITTER');
        }
        return embed;
    } else {
        return;
    }
};
