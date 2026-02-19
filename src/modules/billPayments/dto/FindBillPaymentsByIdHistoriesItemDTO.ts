import { FindBillPaymentsByIdUserDTO } from '@modules/billPayments/dto/FindBillPaymentsByIdUserDTO';
import { FindBillPaymentsByIdErrorDTO } from '@modules/billPayments/dto/FindBillPaymentsByIdErrorDTO';

export interface FindBillPaymentsByIdHistoriesItemDTO {
  id?: number;
  description?: string;
  status?: string;
  user?: FindBillPaymentsByIdUserDTO;
  error?: FindBillPaymentsByIdErrorDTO;
  createdAt?: string;
}
