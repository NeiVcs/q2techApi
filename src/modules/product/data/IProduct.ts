import { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  storeId: string;
  name: string;
  category: string;
  description: string;
  isActived: boolean;
  imgUrl: string;
  price: number;
  previewPrice: number;
  additionalListId: string;
}
