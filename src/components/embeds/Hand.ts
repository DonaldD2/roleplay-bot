import { ChatInputCommandInteraction } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: ChatInputCommandInteraction) => {
    const receive = await userModel.findOne({
        discordId: interaction.options.getMember('user'),
    });
    const send = await userModel.findOne({
        discordId: interaction.user.id,
    });
    if (
        send?.items?.includes(interaction.options.getString('item') as string)
    ) {
        send!.items = send?.items?.filter(
            (item) => item !== interaction.options.getString('item')
        );
        await send?.save();
        receive?.items?.push(interaction.options.getString('item') as string);
        await receive!.save();
    }
};
