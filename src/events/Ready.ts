import { ActivityType } from 'discord.js';
import checkDB from '../components/functions/checkDB';
import type { Client } from 'discord.js';
// import GasTicker from '../components/functions/GasTicker';

export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
        checkDB(client).then(() => {
            console.log(`Ensured database`);
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
        // client.guilds.cache.forEach(async (guild) => {
        //     guild.members.cache.forEach(async (member) => {
        //         await GasTicker(member);
        //     });
        // });
    },
};
