import consola from 'consola';
import { Client } from 'discord.js';
import userModel, { basicJSON } from '../../models/user.model';
import userUpToDate from './userUpToDate';
import type { IUser } from '../../models/user.model';

export default async (client: Client) => {
    client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach(async (member) => {
            const dbUser = await userModel.findOne({
                discordId: member.id,
            });
            userUpToDate(dbUser as IUser, member)
            if (!dbUser) {
                basicJSON.discordId = member.id;
                userModel
                    .create(basicJSON)
                    .catch((err) => {
                        consola.error(err);
                    });
            }
        });
    });
};
