import { PaidBillPaymentsUserDTO } from '@modules/billPayments/dto/PaidBillPaymentsUserDTO';

export interface PaidBillPaymentsInputDTO {
  id: string;
  entityId: string;
  user: PaidBillPaymentsUserDTO;
}
