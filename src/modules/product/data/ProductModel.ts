import mongoose, { Schema } from 'mongoose';
import { IProduct } from './IProduct';

const ProductSchema: Schema = new Schema({
  storeId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },
  isAdditional: { type: Boolean, required: true },
  imgUrl: { type: String },
  price: { type: Number, required: true },
  previewPrice: { type: Number },
  additionalIdList: { type: [String] },
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
