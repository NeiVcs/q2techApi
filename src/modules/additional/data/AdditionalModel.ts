import mongoose, { Schema } from 'mongoose';
import { IAdditional } from './IAdditional';

const ProductList = {
  productId: { type: String, required: true },
  price: { type: Number, required: true },
}

const AdditionalSchema: Schema = new Schema({
  companyId: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  productList: { type: [ProductList], required: true },
});

export const AdditionalModel = mongoose.model<IAdditional>('Additional', AdditionalSchema);
