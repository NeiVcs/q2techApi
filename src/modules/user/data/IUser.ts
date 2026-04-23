import { Document } from 'mongoose';

export interface IUserPlan {
  [x: string]: unknown;
  name?: string;
  value?: number;
  validate?: string;
}

export interface ICompanyDataList {
  [x: string]: unknown;
  companyId?: string
  resource?: string
  plan?: IUserPlan;
  billing?: IUserBilling[];
}

export interface IUserBilling {
  [x: string]: unknown;
  dueDate?: string;
  value?: number;
  status?: 'pending' | 'paid' | 'cancelled';
}

export interface IUser extends Document {
  id?: string;
  name?: string;
  password?: string;
  taxId?: string;
  email?: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  companyDataList?: ICompanyDataList[];
  lastLogin?: string;
  createdAt?: string;
}
