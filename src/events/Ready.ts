import consola from 'consola';
import { ActivityType } from 'discord.js';
import checkDB from '../components/functions/checkDB';
import type { Client } from 'discord.js';
export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        consola.success(`Ready! Logged in as ${client.user?.tag}`);
        checkDB(client).then(() => {
            consola.success(`Ensured database`);
        });
        client.user?.setActivity(
            `Over ${client.guilds.cache.reduce(
                (acc, guild) => acc + guild.memberCount,
                0
            )} Members`,
            {
                type: ActivityType.Watching,
            }
        );
    },
};
