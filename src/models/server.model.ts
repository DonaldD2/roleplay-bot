import { Schema, model, Document } from 'mongoose';

interface IServer extends Document {
    serverId: string;
    emergency_role?: string;
}

export const basicJSON = {
    serverId: '',
    emergency_role: '',
};

export default model<IServer>(
    'servers',
    new Schema<IServer>({
        serverId: { type: String, required: true },
        emergency_role: { type: String, required: false },
    })
);
