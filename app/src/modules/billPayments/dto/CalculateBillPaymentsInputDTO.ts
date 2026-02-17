import { CalculateBillPaymentsRatesItemDTO } from '@modules/billPayments/dto/CalculateBillPaymentsRatesItemDTO';
import { OrderBillPaymentsSegmentTypeEnum } from '@modules/billPayments/enum/OrderBillPaymentsSegmentTypeEnum';

export interface CalculateBillPaymentsInputDTO {
  segment: OrderBillPaymentsSegmentTypeEnum;
  accountId: string;
  barcode?: string;
  typeableLine?: string;
  rates: CalculateBillPaymentsRatesItemDTO[];
}
