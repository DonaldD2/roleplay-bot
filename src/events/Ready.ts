import consola from 'consola';
import type { Client, Guild } from 'discord.js';
import Server from '../models/Server';
import { setTimeout } from 'timers/promises';

export = {
    name: 'ready',
    once: 'true',
    execute(client: Client) {
        consola.success(`Ready! Logged in as ${client.user?.tag}`);
        client.guilds.cache.forEach((guild: Guild) => {
            Server.findOne({ serverId: guild.id }, null, (err, server) => {
                if (err) {
                    consola.error(err);
                } else if (!server) {
                    const newServer = new Server({
                        serverId: guild.id,
                        managerRoleId: guild.roles.highest.id,
                    });
                    newServer.save();
                }
            });
        });
        // client.guilds.cache.forEach((guild: Guild) => {
        //     guild.members.cache.forEach((member) => {
        //         Email.findOne({ discordId: member.id }, null, (err, email) => {
        //             if (err) {
        //                 consola.error(err);
        //             } else if (!email) {
        //                 const newEmail = new Email({
        //                     discordId: member.id,
        //                     email: '',
        //                 });
        //                 newEmail.save();
        //             }
        //         });
        //         Inventory.findOne(
        //             { discordId: member.id },
        //             null,
        //             (err, inventory) => {
        //                 if (err) {
        //                     consola.error(err);
        //                 } else if (!inventory) {
        //                     const newInventory = new Inventory({
        //                         discordId: member.id,
        //                         inventory: {},
        //                     });
        //                     newInventory.save();
        //                 }
        //             }
        //         );
        //         Phone.findOne({ discordId: member.id }, null, (err, phone) => {
        //             if (err) {
        //                 consola.error(err);
        //             } else if (!phone) {
        //                 const newPhone = new Phone({
        //                     discordId: member.id,
        //                     number: '',
        //                 });
        //                 newPhone.save();
        //             }
        //         });
        //         Twitter.findOne(
        //             { discordId: member.id },
        //             null,
        //             (err, twitter) => {
        //                 if (err) {
        //                     consola.error(err);
        //                 } else if (!twitter) {
        //                     const newTwitter = new Twitter({
        //                         discordId: member.id,
        //                         username: '',
        //                         pfp: '',
        //                     });
        //                     newTwitter.save();
        //                 }
        //             }
        //         );
        //     });
        // });

        while (true) {
            setTimeout(3600000);
            let f: number = client.guilds.cache.reduce(
                (acc: any, guild: Guild) => acc + guild.memberCount,
                0
            );
            client.user?.setActivity(`Over ${f} Members`, { type: 'WATCHING' });
        }
    },
};
