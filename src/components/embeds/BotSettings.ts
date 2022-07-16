import { MessageEmbed } from 'discord.js';

export const Verified = new MessageEmbed()
    .setTitle('User Verified')
    .setTimestamp();

export const UnVerified = new MessageEmbed()
    .setTitle('User Unverified')
    .setTimestamp();

export const VerifiedList = new MessageEmbed()
    .setTitle('Verified Users')
    .setTimestamp();
