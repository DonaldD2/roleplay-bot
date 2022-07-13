import { MessageEmbed } from 'discord.js';

export const Verified: MessageEmbed = new MessageEmbed()
    .setTitle('User Verified')
    .setTimestamp();

export const UnVerified: MessageEmbed = new MessageEmbed()
    .setTitle('User Unverified')
    .setTimestamp();

export const VerifiedList: MessageEmbed = new MessageEmbed()
    .setTitle('Verified Users')
    .setTimestamp();
