import { Schema, model, Document } from 'mongoose';
interface IUser extends Document {
    discordId: string;
    verifiedServers?: string[];
    number?: string;
    contacts: [{ name?: string; number?: string }];
    items: string[];
    twitter: {
        username?: string;
        pfp?: string;
    };
    life: {
        username?: string;
        pfp?: string;
    };
    email?: string;
    engine: boolean;
    gas: number;
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
    items: [''],
    twitter: {
        username: '',
        pfp: '',
    },
    life: {
        username: '',
        pfp: '',
    },
    email: '',
    engine: false,
    gas: 100,
};

export default model<IUser>(
    'users',
    new Schema<IUser>({
        discordId: { type: String, required: true },
        verifiedServers: { type: [String], required: false },
        number: {
            type: String,
            required: false,
        },
        contacts: {
            type: [
                {
                    name: { type: String, required: false },
                    Number: { type: String, required: false },
                },
            ],
            required: true,
        },
        items: {
            type: [String],
            required: true,
        },
        twitter: {
            type: {
                username: { type: String, required: false },
                pfp: { type: String, required: false },
            },
            required: true,
        },
        life: {
            type: {
                username: { type: String, required: false },
                pfp: { type: String, required: false },
            },
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        engine: {
            type: Boolean,
            required: true,
        },
        gas: {
            type: Number,
            required: true,
        },
    })
);
