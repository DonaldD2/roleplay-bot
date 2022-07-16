import consola from 'consola';
import type { Client } from 'discord.js';
import checkDB from '../components/functions/checkDB';

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
        checkDB(client);
        consola.success(`Ensured all users are in the database`);
    },
};
