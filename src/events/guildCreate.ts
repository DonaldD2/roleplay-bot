import { Guild } from 'discord.js';
import UserModel, { basicJSON } from '../models/user.model';

export = {
    name: 'guildCreate',
    async execute(guild: Guild) {
        guild.members.cache.forEach((member) => {
            const dbUser = UserModel.findOne({ discordId: member.id });
            if (!dbUser) {
                basicJSON.discordId = member.id;
                UserModel.create(basicJSON);
            }
        });
    },
};
