import consola from 'consola';
import { Client } from 'discord.js';
import userModel, { basicJSON } from '../../models/user.model';

export default async (client: Client) => {
    client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach(async (member) => {
            const dbUser = await userModel.findOne({
                discordId: member.id,
            });
            if (!dbUser) {
                basicJSON.discordId = member.id;
                userModel.create(basicJSON).catch((err) => {
                    consola.error(err);
                });
            }
        });
    });
};
