import { Schema, model, Document } from 'mongoose';

export interface IisIn extends Document {
    plotId: string;
    fieldId: string;
}

const isInSchema = new Schema({
    plotId: {
        type: String,
        required: true,
        ref: 'Plot',
    },
    fieldId: String,
});

export default model<IisIn>('isIn', isInSchema);