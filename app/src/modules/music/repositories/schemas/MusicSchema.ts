import mongoose, { Schema } from 'mongoose';
import { MusicEntity } from '../entities/MusicEntity';

const MusicSchema: Schema = new Schema({
  year: { type: Number, required: true },
  days: { type: [String], required: true },
});

export default mongoose.model<MusicEntity>('Music', MusicSchema);
