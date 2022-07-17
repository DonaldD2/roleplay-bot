import type { GuildMember } from "discord.js";
import { IUser } from "../../models/user.model";

export default (dbUser: IUser, member: GuildMember) => {
    if(!dbUser.discordId) dbUser.discordId = member.id;
    if(!dbUser.verifiedServers) dbUser.verifiedServers = [];
    if(!dbUser.number) dbUser.number = '';
    if(!dbUser.contacts) dbUser.contacts = [{name: '', number: ''}];
    if(!dbUser.items) dbUser.items = [];
    if(!dbUser.twitter) dbUser.twitter = {username: '', pfp: ''};
    if(!dbUser.life) dbUser.life = {username: '', pfp: ''};
    if(!dbUser.email) dbUser.email = '';
}