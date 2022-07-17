import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
    discordId: string;
    verifiedServers: string[];
    number: string;
    contacts: [{ name: string; number: string }];
    items: string[];
    twitter: {
        username: string;
        pfp: string;
    };
    life: {
        username: string;
        pfp: string;
    }
    email: string;
}

export const basicJSON = {
    discordId: '',
    verifiedServers: [],
    number: '',
    contacts: [
        {
            name: '',
            number: '',
        },
    ],
    items: [],
    twitter: {
        username: '',
        pfp: '',
    },
    life: {
        username: '',
        pfp: '',
    },
    email: '',
}

export default model<IUser>(
    'users',
    new Schema<IUser>({
        discordId: { type: String, required: true },
        verifiedServers: { type: [String], required: true },
        number: {
            type: String,
            required: true,
        },
        contacts: {
            type: [
                {
                    name: { type: String, required: true },
                    Number: { type: String, required: true },
                },
            ],
            required: true,
        },
        items: {
            type: [],
            required: true,
        },
        twitter: {
            type: {
                username: { type: String, required: true },
                pfp: { type: String, required: true },
            },
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    })
);
