import { Schema, model, Document } from 'mongoose';
interface ITwitter extends Document {
    discordId: string;
    items: string[];
}

export default model<ITwitter>(
    'inventory',
    new Schema<ITwitter>({
        discordId: { type: String, required: true },
        items: { type: [String], required: true },
    })
);
