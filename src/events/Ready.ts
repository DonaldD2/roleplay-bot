import consola from 'consola';
import type { Client } from 'discord.js';
import checkDB from '../components/functions/checkDB';

export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        consola.success(`Ready! Logged in as ${client.user?.tag}`);
        checkDB(client);
        consola.success(`Ensured all users are in the database`);
        setInterval(() => {
            client.user?.setActivity(
                `Over ${client.guilds.cache.reduce(
                    (acc, guild) => acc + guild.memberCount,
                    0
                )} Members`,
                {
                    type: 'WATCHING',
                }
            );
        }, 10000);
    },
};
