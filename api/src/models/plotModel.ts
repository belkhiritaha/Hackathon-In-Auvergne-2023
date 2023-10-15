import { Schema, model, Document } from 'mongoose';

export interface IPlot extends Document {
    id: string;
    captors: string[];
    currentCulture: string;
    cultureRotation: string[];
    field: string;
}

const plotSchema = new Schema({
    id: String,
    captors: [String],
    currentCulture: String,
    cultureRotation: [String],
    field: String,
});

export default model<IPlot>('Plot', plotSchema);