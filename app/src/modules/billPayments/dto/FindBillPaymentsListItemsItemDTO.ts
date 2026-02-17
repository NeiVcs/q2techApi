import { OrderBillPaymentsStatusEnum } from '@modules/billPayments/enum/OrderBillPaymentsStatusEnum';

export interface FindBillPaymentsListItemsItemDTO {
  id: string;
  entityId: string;
  entityAccountId: string;
  status: OrderBillPaymentsStatusEnum;
  segment: string;
  withdrawType: 'Boleto' | 'Utilities';
  billPaymentTotalValue: number;
  totalFeeValue: number;
  totalOrderValue: number;
  updatedAt: string;
  createdAt: string;
}
