import { Document } from 'mongoose';

export interface MusicEntity extends Document {
  name: string;
  category: string;
  artist: string;
  gender: string;
  link: string;
}
