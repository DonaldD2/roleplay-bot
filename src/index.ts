import fs from 'fs';
import { Client, Collection, Intents, Interaction } from 'discord.js';
import consola from 'consola';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { connect, connection } from 'mongoose';
import env from './env';

connect(`${env.DB_URL}`);
connection.once('open', () => {
    consola.success('Connected to Database!');
});

const intents = new Intents(32767);
const client: Client | any = new Client({
    intents,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.commands = new Collection();
const commandFolders: unknown[] = fs.readdirSync('dist/commands');

for (const _folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`dist/commands`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }
}

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command: any = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        consola.error(error);
        return interaction.reply({
            content:
                'There was an error while executing this command! Contact the support team.',
            ephemeral: true,
        });
    }
});
consola.success('Command Handler Loaded!');

const eventFiles: any = fs
    .readdirSync('./dist/events')
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}
consola.success('Event Handler Loaded!');

export const commands: any = fs
    .readdirSync(`dist/commands`)
    .filter((file) => file.endsWith('.js'))
    .map((file) => require(`./commands/${file}`).data.toJSON());
const rest: REST = new REST({ version: '9' }).setToken(env.TOKEN!);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(env.CLIENTID), {
            body: commands,
        });

        consola.success('Successfully registered application commands.');
    } catch (error) {
        consola.error(error);
    }
})();

client.login(env.TOKEN);
