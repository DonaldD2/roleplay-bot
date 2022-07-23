import type { CommandInteraction } from 'discord.js';
import userModel from '../../models/user.model';

export default async (interaction: CommandInteraction) => {
    const dbUser = await userModel.findOne({
        discordId: interaction.user.id,
    });
    dbUser!.engine = false;
    await dbUser!.save();
}
