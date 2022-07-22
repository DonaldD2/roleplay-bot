import { CommandInteraction } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.inCachedGuild()) {
            const recieve = await userModel.findOne({
                discordId: interaction.options.getMember('user'),
            });
            const send = await userModel.findOne({
                discordId: interaction.user.id,
            });
            if (
                send?.items?.includes(
                    interaction.options.getString('item') as string
                )
            ) {
                send!.items = send?.items?.filter(
                    (item) => item !== interaction.options.getString('item')
                );
                await send?.save();
                if (recieve?.items?.length !== undefined) {
                    recieve!.items = recieve?.items?.concat(
                        interaction.options.getString('item') as string
                    );
                    await recieve!.save();
                } else {
                    recieve!.items = [
                        interaction.options.getString('item') as string,
                    ];
                    await recieve!.save();
                }
            } else {
                interaction.reply({
                    content: 'You do not have this item',
                    ephemeral: true,
                });
            }
        } else {
            return;
        }
    }
};
