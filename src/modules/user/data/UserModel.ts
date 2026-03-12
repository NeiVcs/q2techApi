import mongoose, { Schema } from 'mongoose';
import { IUser } from './IUser';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  taxId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, index: true, lowercase: true },
  phoneNumber: { type: String },
  whatsapp: { type: String },
  active: { type: Boolean, default: true },
  address: {
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true, uppercase: true, minlength: 2, maxlength: 2 },
    complement: { type: String }
  },
  companyDataList: [{
    companyId: { type: String },
    resource: { type: String, required: true, default: 'user' },
    plan: {
      name: { type: String },
      value: { type: Number },
      validate: { type: String }
    },
    billing: [{
      dueDate: { type: String, required: true },
      value: { type: Number, required: true },
      status: { type: String, default: 'pending' }
    }],
  }],
  lastLogin: { type: Date },
  createdAt: { type: String },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
