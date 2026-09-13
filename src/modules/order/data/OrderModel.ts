import mongoose, { Schema } from 'mongoose';
import { IOrder } from './IOrder';

const OrderSchema: Schema = new Schema({
  companyId: { type: String, required: true, index: true },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  notification: { type: String },
  paymentForm: { type: String },
  totalPrice: { type: Number, required: true, default: 0 },
  payedPrice: { type: Number, default: 0 },
  change: { type: Number, default: 0 },
  deliveryMode: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: String },
  userData: {
    userId: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    address: {
      zipCode: { type: String },
      street: { type: String },
      number: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String, uppercase: true, minlength: 2, maxlength: 2 },
      complement: { type: String },
      reference: { type: String }
    }
  },
  orderData: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    observation: { type: String },
    status: { type: String },
    createdAt: { type: String },
    updateAt: { type: String },
    additional: [{
      additionalId: { type: String },
      name: { type: String },
      quantity: { type: Number, min: 1 },
      price: { type: Number }
    }]
  }]
});

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
