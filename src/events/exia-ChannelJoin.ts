// type ServerInfo = {
//     uri: string;
//     token: string;
// };

// import { VoiceState } from 'discord.js';
// import request from 'request';
// import type { OptionsWithUri, Response } from 'request';

// const ps: ServerInfo = {
//     uri: 'https://ps-api.exiaroleplay.com/v1',
//     token: 'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
// };

// const xbox: ServerInfo = {
//     uri: 'https://xbox-api.exiaroleplay.com/v1',
//     token: '8JpXLEJr5W5nxdREICZoGodAR4T8XTyMW2GYVTV4qWkdUFHK5wefQgjQ',
// };

// const allusers = (serverId: string): Promise<any> => {
//     let options: OptionsWithUri = {
//         method: 'GET',
//         uri: '',
//         headers: {
//             'snaily-cad-api-token': '',
//             'Content-Type': 'text/plain',
//         },
//     };
//     switch (serverId) {
//         case '527702646585425921': //ps
//             options.uri = `${ps.uri}/admin/manage/units`;
//             options.headers = {
//                 'snaily-cad-api-token': ps.token,
//                 'Content-Type': 'text/plain',
//             };
//             break;
//         case '527706493772890114': //xbox
//             options.uri = `${xbox.uri}/admin/manage/units`;
//             options.headers = {
//                 'snaily-cad-api-token': xbox.token,
//                 'Content-Type': 'text/plain',
//             };
//             break;
//     }

//     return new Promise((resolve, reject) => {
//         request(options, function (error: Error, response: Response) {
//             if (error) reject(error);
//             if (response.body) resolve(response.body);
//         });
//     });
// };

// export = {
//     name: 'voiceStateUpdate',
//     async execute(_oldstate: VoiceState, newstate: VoiceState) {
//         if (
//             newstate.guild.id === '527702646585425921' ||
//             '527706493772890114'
//         ) {
//             const users = JSON.parse(await allusers(newstate.guild.id));
//             const ulength = users.length;
//             switch (newstate.channelId) {
//                 case '527708030070947880':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token': '',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: JSON.stringify({ radioChannel: 'R.T.O' }),
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             if (options.uri != '') {
//                                 request(options, (error) => {
//                                     if (error) throw new Error(error);
//                                 });
//                             }
//                             break;
//                         }
//                     }
//                     break;
//                 case '919748194848612452':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token': '',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Priority R.T.O"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708031727960064':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "911 Line"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '533776610109816843':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "10-01"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '614566196938932292':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Ride Along 1"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '614566757876760586':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Ride Along 2"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '614566860767100929':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Ride Along 3"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '658477668051845140':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Ride Along 4"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '845380526205960262':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Ride Along 5"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708028363866114':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Fire/EMS Radio"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708033317601316':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //1
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708034756116490':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //2
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708036308140032':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //3
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708037906038785':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //4
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708039374176256':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //5
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '527708040959623168':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //6
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '534931749659082752':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //7
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 case '534931922552487936':
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "Traffic Stop"}', //8
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//                     break;
//                 default:
//                     for (let i = 0; i < ulength; i++) {
//                         if (users[i].user.discordId === newstate.id) {
//                             let options: OptionsWithUri = {
//                                 method: 'PUT',
//                                 uri: '',
//                                 headers: {
//                                     'snaily-cad-api-token':
//                                         'Avo4FcUhMOwDY33EMhZYcq-CBpD2Ya6lcznuVhGo7AntnsCn86VyovMM',
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: '{"radioChannel": "N/A"}',
//                             };
//                             switch (newstate.guild.id) {
//                                 case '527702646585425921': //ps
//                                     options.uri = `${ps.uri}/dispatch/radio-channel/${users[i].id}s`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': ps.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                                 case '527706493772890114': //xbox
//                                     options.uri = `${xbox.uri}/dispatch/radio-channel/${users[i].id}`;
//                                     options.headers = {
//                                         'snaily-cad-api-token': xbox.token,
//                                         'Content-Type': 'application/json',
//                                     };
//                                     break;
//                             }
//                             request(options, (error) => {
//                                 if (error) throw new Error(error);
//                             });
//                             break;
//                         }
//                     }
//             }
//         }
//     },
// };
