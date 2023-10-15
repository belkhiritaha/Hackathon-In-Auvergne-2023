import { Schema, model, Document } from 'mongoose';

export interface ISensor extends Document {
    id: string;
    name: string;
    description: string;
    position: [number, number];
    x: number[];
    y: number[];
    expected: number[];
}

const sensorSchema = new Schema({
    id: String,
    name: String,
    description: String,
    position: [Number, Number],
    x: [Number],
    y: [Number],
    expected: [Number],
});

export default model<ISensor>('Sensor', sensorSchema);