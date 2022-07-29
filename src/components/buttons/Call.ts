import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default async () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Accept')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('858107173799198740'),

        new ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Decline')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('858107161266618369')
    );
};
