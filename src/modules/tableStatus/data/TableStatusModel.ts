import mongoose, { Schema } from 'mongoose';
import { ITableStatus } from './ITableStatus';

const TableStatusSchema: Schema = new Schema({
  companyId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
});

export const TableStatusModel = mongoose.model<ITableStatus>('TableStatus', TableStatusSchema);
