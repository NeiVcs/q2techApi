import { Document } from 'mongoose';

export interface IUserAddress {
  zipCode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
}

export interface IUserPlan {
  name?: string;
  value?: number;
  validate?: string;
}

export interface IUserBilling {
  dueDate?: string;
  value?: number;
  status?: 'pending' | 'paid' | 'cancelled';
}

export interface IUser extends Document {
  id?: string;
  companyId?: string;
  name?: string;
  password?: string;
  cpf?: string;
  email?: string;
  phoneNumber?: string;
  whatsapp?: string;
  position?: string;
  resource?: string;
  address?: IUserAddress;
  plan?: IUserPlan;
  active?: boolean;
  billing?: IUserBilling[];
  lastLogin?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}
