import { CreateNewBillPaymentsUserDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsUserDTO';

export interface CreateBillPaymentsHistoryOrderDto {
  id?: number;
  orderBillPaymentsId?: number;
  description: string;
  user: CreateNewBillPaymentsUserDTO;
  status: string;
  error?: any;
  createdAt?: Date;
}
