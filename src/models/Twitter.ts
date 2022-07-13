import { Schema, model, Document } from 'mongoose';
interface ITwitter extends Document {
    discordId: string;
    username: string;
    pfp: string;
}

export default model<ITwitter>(
    'twitterUsers',
    new Schema<ITwitter>({
        discordId: { type: String, required: true },
        username: { type: String, required: true },
        pfp: { type: String, required: true },
    })
);
