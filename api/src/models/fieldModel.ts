import { Schema, model, Document } from 'mongoose';

export interface IField extends Document {
    description: string;
}

const fieldSchema = new Schema({
    description: String,
});

export default model<IField>('Field', fieldSchema);