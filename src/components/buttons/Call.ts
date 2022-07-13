import { MessageActionRow, MessageButton } from 'discord.js';

export default new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId('accept')
        .setLabel('Accept')
        .setStyle('SUCCESS')
        .setEmoji('858107173799198740'),

    new MessageButton()
        .setCustomId('decline')
        .setLabel('Decline')
        .setStyle('DANGER')
        .setEmoji('858107161266618369')
);
