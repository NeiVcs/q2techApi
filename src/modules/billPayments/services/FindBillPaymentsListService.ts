import { singleton } from 'tsyringe';
import { FindBillPaymentsListInputDTO } from '@modules/billPayments/dto/FindBillPaymentsListInputDTO';
import { FindBillPaymentsListOutputDTO } from '@modules/billPayments/dto/FindBillPaymentsListOutputDTO';

@singleton()
export class FindBillPaymentsListService {

  public async execute(inputDTO: FindBillPaymentsListInputDTO): Promise<FindBillPaymentsListOutputDTO> {
    return null
  }
}
