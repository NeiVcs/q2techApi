import { FeePayBillPaymentsUserDTO } from '@modules/billPayments/dto/FeePayBillPaymentsUserDTO';

export interface FeePayBillPaymentsInputDTO {
  id: string;
  entityId: string;
  feeTransactionId: string;
  user: FeePayBillPaymentsUserDTO;
}
