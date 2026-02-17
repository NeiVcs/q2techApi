import { CreateNewBillPaymentsUserDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsUserDTO';
import { OrderBillPaymentsSegmentTypeEnum } from '@modules/billPayments/enum/OrderBillPaymentsSegmentTypeEnum';

export interface CreateNewBillPaymentsInputDTO {
  xIdempotencyKey: string;
  segment: OrderBillPaymentsSegmentTypeEnum;
  entityId: string;
  entityAccountId: string;
  accountId: string;
  accountBranch: number;
  accountNumber: number;
  source: string;
  reason?: string;
  user: CreateNewBillPaymentsUserDTO;
  needAuthorization: boolean;
  barcode?: string;
  typeableLine?: string;
}
