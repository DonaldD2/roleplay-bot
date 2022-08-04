import {
    type ChatInputCommandInteraction,
    SlashCommandBuilder,
} from 'discord.js';

import BusinessAdvertisement from '../components/embeds/Business-Advertisement';

export = {
    data: new SlashCommandBuilder()
        .setName('business-advertisement')
        .setDescription(' Advertise a business!')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription(" Mention the business's name")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription(" Mention the business's location")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('status')
                .setDescription("• Mention the business's status")
                .setRequired(true)
                .addChoices(
                    { name: 'Open', value: 'Open' },
                    { name: 'Closed', value: 'Closed' }
                )
        )
        .addAttachmentOption((option) =>
            option
                .setName('logo')
                .setDescription("• Add the business's image/logo")
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const Logo = interaction.options.getAttachment('logo').proxyURL;
        const Name = interaction.options.getString('name');
        const Location = interaction.options.getString('location');
        const Status = interaction.options.getString('status');

        BusinessAdvertisement.setTitle(`${Name}`);
        BusinessAdvertisement.setThumbnail(Logo || '');
        BusinessAdvertisement.setDescription(
            `Information about ${Name} business bellow:`
        );
        BusinessAdvertisement.addFields(
            { name: 'Status', value: `${Status}`, inline: true },
            { name: 'Locaton', value: `${Location}`, inline: true }
        );
        await interaction.reply({
            embeds: [BusinessAdvertisement],
        });
    },
};
