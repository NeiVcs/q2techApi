import mongoose, { Schema } from 'mongoose';
import { IProduct } from './IProduct';

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true },
  storeId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  isActived: { type: Boolean, required: true },
  imgUrl: { type: String, required: true },
  observations: { type: String, required: true },
  price: { type: Number, required: true },
  previewPrice: { type: Number, required: true },
  additionalListId: { type: String, required: true },
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
