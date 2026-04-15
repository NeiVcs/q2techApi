import { Document } from 'mongoose';

export interface IProductList {
  [key: string]: unknown;
  productId: string;
  price: number;
}

export interface IAdditional extends Document {
  id: string;
  companyId: string;
  category: string;
  name: string;
  min: number;
  max: number;
  productList: IProductList[];
}
