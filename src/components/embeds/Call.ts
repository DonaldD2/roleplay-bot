import { MessageEmbed } from 'discord.js';

export const Calling = new MessageEmbed().setTimestamp();

export const Accepted = new MessageEmbed()
    .setColor('#3BA55C')
    .setTitle('Call Accepted')
    .setTimestamp();

export const Declined = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Call Failed')
    .setTimestamp();
