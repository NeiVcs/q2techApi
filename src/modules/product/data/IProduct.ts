import { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  companyId: string;
  name: string;
  category: string;
  description: string;
  active: boolean;
  isAdditional: boolean;
  imgUrl: string;
  price: number;
  previewPrice: number;
  additionalIdList: string[];
}
