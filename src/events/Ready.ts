import consola from 'consola';
import type { Client, Guild } from 'discord.js';
import Server from '../models/Server';

export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        let f: number = client.guilds.cache.reduce(
            (acc: any, guild: Guild) => acc + guild.memberCount,
            0
        );
        client.user?.setActivity(`Over ${f} Members`, { type: 'WATCHING' });
        consola.success(`Ready! Logged in as ${client.user?.tag}`);
        client.guilds.cache.forEach((guild: Guild) => {
            Server.findOne({ serverId: guild.id }, null, (err, server) => {
                if (err) {
                    consola.error(err);
                } else if (!server) {
                    const newServer = new Server({
                        serverId: guild.id,
                        managerRoleId: guild.roles.highest.id,
                    });
                    newServer.save();
                }
            });
        });
    },
};
