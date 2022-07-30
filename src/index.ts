import {
    Client,
    Partials,
    Interaction,
    Collection,
    InteractionType,
} from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { connect } from 'mongoose';
import env from './env';
import * as fs from "fs";

connect(`${env.DB_URL}`).then(() => {
    console.log('Connected to Database!');
});

const client: Client | any = new Client({
    intents: 32767,
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});

client.commands = new Collection();
const commandFolders = fs.readdirSync('src/commands');

for (const _folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`src/commands`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }
}

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content:
                'There was an error while executing this command! Contact the support team.',
            ephemeral: true,
        });
    }
    return;
});
console.log('Command Handler Loaded!');

const eventFiles = fs
    .readdirSync('./src/events')
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args: unknown[]) => event.execute(...args));
    } else {
        client.on(event.name, (...args: unknown[]) => event.execute(...args));
    }
}
console.log('Event Handler Loaded!');

export const commands = fs
    .readdirSync(`src/commands`)
    .filter((file) => file.endsWith('.js'))
    .map((file) => require(`./commands/${file}`).data.toJSON());

const rest = new REST({ version: '9' }).setToken(env.TOKEN as string);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(env.CLIENTID as string), {
            body: commands,
        });

        console.log('Successfully registered application commands.');
    } catch (error) {
        throw new Error(error);
    }
})();

client.login(env.TOKEN);
