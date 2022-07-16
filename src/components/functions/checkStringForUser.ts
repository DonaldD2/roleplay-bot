import { CommandInteraction } from 'discord.js';

export default (interaction: CommandInteraction, content: string) => {
    if (interaction.inCachedGuild()) {
        if (content?.includes('<@')) {
            content.split(' ')
                .forEach(async (user) => {
                    /<@!?(\d+)>/.test(user)
                        ? interaction.channel?.send(`${user}`)
                        : null;
                });
        }
    }
};
