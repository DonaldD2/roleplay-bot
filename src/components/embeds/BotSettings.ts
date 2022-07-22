import { EmbedBuilder } from 'discord.js';

export const Verified = new EmbedBuilder()
    .setTitle('User Verified')
    .setTimestamp();

export const UnVerified = new EmbedBuilder()
    .setTitle('User Unverified')
    .setTimestamp();

export const VerifiedList = new EmbedBuilder()
    .setTitle('Verified Users')
    .setTimestamp();
