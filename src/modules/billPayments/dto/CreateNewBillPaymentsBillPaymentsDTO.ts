import { CreateNewBillPaymentsDraweeDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsDraweeDTO';
import { CreateNewBillPaymentsBeneficiaryDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsBeneficiaryDTO';
import { CreateNewBillPaymentsFinalBeneficiaryDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsFinalBeneficiaryDTO';
import { CreateNewBillPaymentsDetailsDTO } from '@modules/billPayments/dto/CreateNewBillPaymentsDetailsDTO';

export interface CreateNewBillPaymentsBillPaymentsDTO {
  typeAmountAccepted?: number;
  drawee?: CreateNewBillPaymentsDraweeDTO;
  beneficiary?: CreateNewBillPaymentsBeneficiaryDTO;
  finalBeneficiary?: CreateNewBillPaymentsFinalBeneficiaryDTO;
  details?: CreateNewBillPaymentsDetailsDTO;
  financialInstitution?: string;
}
