import { PaginationDTO } from '@shared/dto/PaginationDTO';
import { FindBillPaymentsListItemsItemDTO } from '@modules/billPayments/dto/FindBillPaymentsListItemsItemDTO';

export interface FindBillPaymentsListOutputDTO {
  pagination?: PaginationDTO;
  items?: FindBillPaymentsListItemsItemDTO[];
}
