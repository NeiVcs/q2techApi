import mongoose, { Schema } from 'mongoose';
import { IAdditional } from './IAdditional';

const AdditionalSchema: Schema = new Schema({
  name: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  productIdList: { type: [String], required: true },
});

export const AdditionalModel = mongoose.model<IAdditional>('Additional', AdditionalSchema);
