import { MessageEmbed } from 'discord.js';

export default new MessageEmbed().setTimestamp().setDescription(`Searching `);

export const Found = new MessageEmbed().setTitle('Items Found:').setTimestamp();
