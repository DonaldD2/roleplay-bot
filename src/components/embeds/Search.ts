import { CommandInteraction, EmbedBuilder } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: CommandInteraction) => {
    if (interaction.inCachedGuild()) {
        const embed = new EmbedBuilder()
            .setTitle('Items Found:')
            .setTimestamp();
        const dbUser = await userModel.findOne({
            discordId: interaction.options.getMember('user'),
        });
        embed.setDescription('');
        if (dbUser!.items!.length != 0) {
            let items = '';
            dbUser!.items!.forEach((item) => {
                items += `${item}\n`;
            });
            embed.setDescription(items);
            return embed;
        } else {
            embed.setDescription(`No Items Found`);
            return embed;
        }
    } else {
        return;
    }
};
