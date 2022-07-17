import { MessageEmbed } from 'discord.js';
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
        if(interaction.member?.user.avatarURL()) {
            author.iconURL = interaction.member?.user.avatarURL() as string;
        }
        if (dbUser!.life!.username != '') {
            author.name = dbUser!.life!.username as string;
        }
        if (dbUser!.life!.pfp != '') {
            author.iconURL = dbUser!.life!.pfp;
        }
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<:life:868996525127258154> Life Invader')
            .setDescription(content)
            .setAuthor(author)
            .setTimestamp();
        if (image) {
            embed.setImage(image);
        }
        if (dbUser?.verifiedServers!.includes(interaction.guildId as string)) {
            embed.setTitle('<:verifiedred:876176988166045727> Life Invader');
        }
        return embed;
    } else {
        return;
    }
};
