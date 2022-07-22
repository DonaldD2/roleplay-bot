import type { MessageReaction, User } from 'discord.js';
import userModel from '../models/user.model';

export = {
    name: 'messageReactionAdd',
    async execute(reaction: MessageReaction, user: User) {
        if (reaction.emoji.id === '995421485063745706' && !user.bot) {
            const dbUser = await userModel.findOne({ discordId: user.id });
            const name = dbUser?.twitter?.username || user.username;
            const embed = reaction.message.embeds[0].toJSON();
            embed.footer = {text: `${name} reposted`};
            reaction.message.channel.send({
                embeds: [embed],
            });
        }
    },
};
