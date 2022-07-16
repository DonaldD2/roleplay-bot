import consola from 'consola';
import { Client } from 'discord.js';
import userModel from '../../models/user.model';

export default async (client: Client) => {
    client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach(async (member) => {
            const dbUser = await userModel.findOne({
                discordId: member.id,
            });
            if (!dbUser) {
                userModel
                    .create({
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
                    })
                    .catch((err) => {
                        consola.error(err);
                    });
            }
        });
    });
};
