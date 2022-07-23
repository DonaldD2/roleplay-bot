import type { CommandInteraction } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: CommandInteraction) => {
    const dbUser = await userModel.findOne({
        discordId: interaction.user.id,
    });
    dbUser!.engine = true;
    await dbUser!.save();
}
