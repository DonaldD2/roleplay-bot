import  {
    ChatInputCommandInteraction,
    EmbedBuilder,
    WebhookClient,
    SlashCommandBuilder,
} from 'discord.js';

import ms from 'ms';

import BusinessAdvertisement from '../components/embeds/Business-Advertisement';

exports = {
    data: new SlashCommandBuilder()
    .setName('business-advertisement')
    .setDescription(' Advertise a business!')
    .addStringOption((option) =>
        option
        .setName('name')
        .setDescription(' Mention the business\'s name')
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
    .setName('location')
    .setDescription(' Mention the business\'s location')
    .setRequired(true)
    )
    .addStringOption((option) =>
        option
        .setName('status')
        .setDescription('• Mention the business\'s status')
        .setRequired(true)
        .addChoices(
            { name: "Open", value: "Open"},
            { name: "Closed", value: "Closed"}
        ))
        .addAttachmentOption((option) =>
        option
        .setName('logo')
        .setDescription('• Add the business\'s image/logo')
        .setRequired(false)
    ),


    async execute(interaction: ChatInputCommandInteraction) {
        const Logo = interaction.options.getAttachment("logo").proxyURL;
        const Name = interaction.options.getString("name");
        const Location = interaction.options.getString("location");
        const Status = interaction.options.getString("status");

        if(!Logo) {
            BusinessAdvertisement.setColor('#2e85c5')     
            BusinessAdvertisement.setTitle(`${Name}`)
            BusinessAdvertisement.setDescription(`Information about ${Name} business bellow:`)
            BusinessAdvertisement.addFields(
                {name: "Status", value: `${Status}`, inline: true},
                {name: "Locaton", value: `${Location}`, inline: true},
            )
        } else {
            BusinessAdvertisement.setColor('#2e85c5')     
            BusinessAdvertisement.setThumbnail(`${Logo}`)
            BusinessAdvertisement.setTitle(`${Name}`)
            BusinessAdvertisement.setDescription(`Information about ${Name} business bellow:`)
            BusinessAdvertisement.addFields(
                {name: "Status", value: `${Status}`, inline: true},
                {name: "Locaton", value: `${Location}`, inline: true}
            )
        }


        interaction.reply({embeds: [
            BusinessAdvertisement
        ]
    })
       
    },

};
