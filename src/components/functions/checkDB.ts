import { Client } from 'discord.js';
import userModel, { basicJSON as basicUserJSON } from '../../models/user.model';
import serverModel, {
    basicJSON as basicServerJSON,
} from '../../models/server.model';

export default async (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        const dbServer = await serverModel.findOne({ serverId: guild.id });
        if (!dbServer) {
            basicServerJSON.serverId = guild.id;
            await serverModel.create(basicServerJSON);
        }
        guild.members.cache.forEach(async (member) => {
            const dbUser = await userModel.findOne({
                discordId: member.id,
            });
            if (!dbUser) {
                basicUserJSON.discordId = member.id;
                await userModel.create(basicUserJSON);
            }
        });
    });
};
