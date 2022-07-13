import { Guild } from 'discord.js';
import Server from '../models/Server';

export = {
    name: 'guildCreate',
    execute(guild: Guild) {
        Server.findOne({ serverId: guild.id }, null, (err, server) => {
            if (err) console.log(err);
            if (!server) {
                const newServer = new Server({
                    serverId: guild.id,
                    verifiedUsers: [guild.ownerId],
                });
                newServer.save();
            }
        });
    },
};
