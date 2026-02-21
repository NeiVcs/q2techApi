import { Document } from 'mongoose';

export interface IAdditional extends Document {
  id: string;
  name: string;
  min: number;
  max: number;
  productIdList: string[];
}
