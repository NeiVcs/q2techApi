import { Document } from 'mongoose';

export interface IMusic extends Document {
  id: string;
  name: string;
  category: string;
  artist: string;
  gender: string;
  link: string;
}
