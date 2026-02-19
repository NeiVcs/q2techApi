import { FindBillPaymentsByIdHistoriesItemDTO } from '@modules/billPayments/dto/FindBillPaymentsByIdHistoriesItemDTO';

import { FindBillPaymentsByIdRatesItemDTO } from '@modules/billPayments/dto/FindBillPaymentsByIdRatesItemDTO';
import { BillPaymentsByIdAdditionalInformationOutputDTO } from '@modules/billPayments/dto/BillPaymentsByIdAdditionalInformationOutputDTO';

export interface FindBillPaymentsByIdOutputDTO {
  id: string;
  entityId: string;
  entityAccountId: string;
  status: string;
  withdrawType: 'Boleto' | 'Utilities';
  segment: string;
  billPaymentInterestsValue?: number;
  billPaymentFineValue?: number;
  billPaymentDiscountValue?: number;
  billPaymentTotalValue?: number;
  billPaymentDueDate?: string;
  billPaymentBarcode?: string;
  totalFeeValue?: number;
  totalOrderValue?: number;
  feeChargeUuid?: string;
  feeTransactionId?: string;
  feeRefundUuid?: string;
  paidTransactionId?: string;
  paidRefundTransactionId?: string;
  histories?: FindBillPaymentsByIdHistoriesItemDTO[];
  rates?: FindBillPaymentsByIdRatesItemDTO[];
  additionalInformation: BillPaymentsByIdAdditionalInformationOutputDTO;
  updatedAt?: string;
  createdAt?: string;
}
