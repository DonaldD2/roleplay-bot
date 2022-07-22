import { EmbedBuilder } from 'discord.js';

export const Calling = new EmbedBuilder().setTimestamp();

export const Accepted = new EmbedBuilder()
    .setColor('#3BA55C')
    .setTitle('Call Accepted')
    .setTimestamp();

export const Declined = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('Call Failed')
    .setTimestamp();
