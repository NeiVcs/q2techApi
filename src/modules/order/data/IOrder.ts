import { Document, Types } from 'mongoose';

export interface IOrderAddress {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  reference?: string;
}

export interface IOrderUser {
  userId: string;
  name: string;
  phoneNumber: string;
  address: IOrderAddress;
}

export interface IOrderItemAdditional {
  additionalId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  observation?: string;
  status: 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CONCLUDED' | 'CANCELLED';
  additional?: IOrderItemAdditional[];
}

export interface IOrder extends Document {
  id: Types.ObjectId;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CONCLUDED' | 'CANCELLED' | 'IN_PROGRESS';
  notification?: string;
  paymentForm: string;
  totalPrice: number;
  payedPrice: number;
  change: number;
  deliveryMode: string;
  rating?: number;
  userData: IOrderUser;
  orderData: IOrderItem[];
}