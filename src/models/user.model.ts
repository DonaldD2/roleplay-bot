import { Schema, model, Document } from 'mongoose';
interface IUser extends Document {
    discordId: string;
    verifiedServers?: string[];
    number?: string;
    contacts?: [{ name?: string; number?: string }];
    items?: string[];
    twitter?: {
        username?: string;
        pfp?: string;
    };
    email?: string;
}

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
            required: false,
        },
        items: {
            type: [],
            required: false,
        },
        twitter: {
            type: {
                username: { type: String, required: false },
                pfp: { type: String, required: false },
            },
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
    })
);
