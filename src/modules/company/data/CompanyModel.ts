import mongoose, { Schema } from 'mongoose';
import { ICompany } from './ICompany';

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  url: { type: String, required: true, unique: true, index: true },
  closed: { type: Boolean, default: false },
  alert: { type: String },
  minOrderPrice: { type: Number, required: true, default: 0 },
  categoriesList: [{
    name: { type: String, required: true },
    icon: { type: String }
  }],
  plan: [{
    name: { type: String, required: true },
    value: { type: Number, required: true },
    validate: { type: String }
  }],
  stylization: {
    hasImage: { type: Boolean, default: false },
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String },
    logo: { type: String },
    header: { type: String }
  },
  contacts: {
    phoneNumberList: [{ type: String }],
    whatsappNumberList: [{ type: String }],
    emailList: [{ type: String, required: true }]
  },
  address: {
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true, uppercase: true, minlength: 2, maxlength: 2 },
    complement: { type: String }
  },
  workSchedule: {
    0: { type: [String] },
    1: { type: [String] },
    2: { type: [String] },
    3: { type: [String] },
    4: { type: [String] },
    5: { type: [String] },
    6: { type: [String] },
    7: { type: [String] },
  },
  paymentForms: [{ type: String }]
});

export const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);
