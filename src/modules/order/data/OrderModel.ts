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
  paymentForm: { type: String, required: true },
  totalPrice: { type: Number, required: true, default: 0 },
  payedPrice: { type: Number, required: true, default: 0 },
  change: { type: Number, required: true, default: 0 },
  deliveryMode: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  userData: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
      zipCode: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
      neighborhood: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true, uppercase: true, minlength: 2, maxlength: 2 },
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
    additional: [{
      additionalId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
    }]
  }]
});

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
