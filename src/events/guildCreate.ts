import { Guild } from 'discord.js';
import UserModel from '../models/user.model';

export = {
    name: 'guildCreate',
    async execute(guild: Guild) {
        guild.members.cache.forEach((member) => {
            const dbUser = UserModel.findOne({ discordId: member.id });
            if (!dbUser) {
                UserModel.create({
                    discordId: member.id,
                    verifiedServers: [],
                    number: '',
                    contacts: [
                        {
                            name: '',
                            number: '',
                        },
                    ],
                    items: [],
                    twitter: {
                        username: '',
                        pfp: '',
                    },
                    email: '',
                });
            }
        });
    },
};
