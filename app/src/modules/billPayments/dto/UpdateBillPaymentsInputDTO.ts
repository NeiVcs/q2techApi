import { OrderBillPaymentsStatusEnum } from '@modules/billPayments/enum/OrderBillPaymentsStatusEnum';
import { UpdateBillPaymentsUserDTO } from '@modules/billPayments/dto/UpdateBillPaymentsUserDTO';

export interface UpdateBillPaymentsInputDTO {
  id: string;
  entityId: string;
  status: OrderBillPaymentsStatusEnum;
  user: UpdateBillPaymentsUserDTO;
}
