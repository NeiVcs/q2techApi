import { Document } from 'mongoose';

export interface ITableStatus extends Document {
  id: string;
  companyId: string;
  userId: string;
  status: string;
}
