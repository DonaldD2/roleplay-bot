import type { MessageReaction, User } from 'discord.js';
import userModel from '../models/user.model';

export = {
    name: 'messageReactionAdd',
    async execute(reaction: MessageReaction, user: User) {
        if (reaction.emoji.id === '998031038938873951' && !user.bot) {
            const dbUser = await userModel.findOne({ discordId: user.id });
            const name = dbUser?.life?.username || user.username;
            reaction.message.channel.send({
                embeds: [
                    reaction.message.embeds[0].setFooter({
                        text: `${name} reposted`,
                    }),
                ],
            });
        }
    },
};
