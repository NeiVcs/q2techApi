import { Document, Types } from 'mongoose';

export interface ICompanyCategory {
  name?: string;
  icon?: string;
}

export interface ICompanyPlan {
  name?: string;
  value?: number;
  validate?: string;
}

export interface ICompanyStylization {
  [x: string]: unknown;
  hasImage?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  header?: string;
}

export interface ICompanyContacts {
  [x: string]: unknown;
  phoneNumberList?: string[];
  whatsappNumberList?: string[];
  emailList?: string[];
}

export interface ICompanyAddress {
  [x: string]: unknown;
  zipCode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
}

export interface ICompanyWorkSchedule {
  weekday?: string;
  start?: string;
  end?: string;
}

export interface ICompany extends Document {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  closed?: boolean;
  alert?: string;
  minOderPrice?: number;
  categoriesList?: ICompanyCategory[];
  plan?: ICompanyPlan[];
  stylization?: ICompanyStylization;
  contacts?: ICompanyContacts;
  address?: ICompanyAddress;
  workSchedule?: ICompanyWorkSchedule[];
  paymentForms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}