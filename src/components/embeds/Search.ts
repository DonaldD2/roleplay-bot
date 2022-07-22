import { CommandInteraction, MessageEmbed } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: CommandInteraction) => {
    if (interaction.inCachedGuild()) {
        const embed = new MessageEmbed()
            .setTitle('Items Found:')
            .setTimestamp();
        const dbUser = await userModel.findOne({
            discordId: interaction.options.getMember('user'),
        });
        embed.description = '';
        if (dbUser!.items!.length != 0) {
            dbUser!.items!.forEach((item) => {
                embed.description += `${item}\n`;
            });
            return embed;
        } else {
            embed.setDescription(`No Items Found`);
            return embed;
        }
    } else {
        return;
    }
};
