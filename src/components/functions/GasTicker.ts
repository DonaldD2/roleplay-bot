import type { GuildMember } from 'discord.js';
import { setInterval } from 'timers';
import userModel from '../../models/user.model';

export default async (member: GuildMember) => {
    setInterval(async () => {
        const dbUser = await userModel.findOne({
            discordId: member.id,
        });
        if (dbUser!.engine === true) {
            dbUser!.gas -= 1;
        }
        if(dbUser!.gas <= 0 && dbUser!.engine === true) {
            dbUser!.engine = false;
            member.user.send('Your have ran out of gas.');
        }
        if(dbUser?.gas > 100) {
            dbUser!.gas = 100;
        }
    }, 60000);
};
