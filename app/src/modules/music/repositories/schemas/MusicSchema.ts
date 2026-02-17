import mongoose, { Schema } from 'mongoose';
import { MusicEntity } from '../entities/MusicEntity';


const MusicSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  artist: { type: String, required: true },
  gender: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.model<MusicEntity>('Music', MusicSchema);
