import { Guild } from 'discord.js';
import Server from '../models/Server';

export = {
    name: 'guildDelete',
    execute(guild: Guild) {
        Server.findOne({ serverId: guild.id }, null, (err) => {
            if (err) console.log(err);
            Server.deleteOne({ serverId: guild.id }, (err: any) => {
                if (err) console.log(err);
            });
        });
    },
};
