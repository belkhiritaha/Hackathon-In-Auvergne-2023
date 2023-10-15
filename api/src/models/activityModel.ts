import { Schema, model, Document } from 'mongoose';

export interface IActivity extends Document {
    id: string;
    description: string;
    image: string;
    soil_type?: string;
    humidity?: number;
    temperature?: number;
    arosage?: number;
    quantity?: number;
}

const activitySchema = new Schema({
    id: String,
    description: String,
    image: String,
    soil_type: String,
    humidity: Number,
    temperature: Number,
    arosage: Number,
    quantity: Number,
});

export default model<IActivity>('Activity', activitySchema);