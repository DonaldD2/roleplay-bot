import { MessageEmbed } from 'discord.js';

export const Calling: MessageEmbed = new MessageEmbed().setTimestamp();

export const Accepted: MessageEmbed = new MessageEmbed()
    .setColor('#3BA55C')
    .setTitle('Call Accepted')
    .setTimestamp();

export const Declined: MessageEmbed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Call Failed')
    .setTimestamp();
