import consola from 'consola';
import type { Client } from 'discord.js';
import userModel from '../models/user.model';

export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        consola.success(`Ready! Logged in as ${client.user?.tag}`);
        const memberCount = client.guilds.cache.reduce(
            (acc, guild) => acc + guild.memberCount,
            0
        );
        client.user?.setActivity(`Over ${memberCount} Members`, {
            type: 'WATCHING',
        });
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
                            contacts: [],
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
        consola.success(`Ensured all users are in the database`);
    },
};
