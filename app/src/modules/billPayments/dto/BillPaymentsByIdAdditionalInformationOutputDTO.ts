import { CalculateBillPaymentsDraweeDTO } from '@modules/billPayments/dto/CalculateBillPaymentsDraweeDTO';
import { CalculateBillPaymentsFinalBeneficiaryDTO } from '@modules/billPayments/dto/CalculateBillPaymentsFinalBeneficiaryDTO';
import { CalculateBillPaymentsDetailsDTO } from '@modules/billPayments/dto/CalculateBillPaymentsDetailsDTO';

export interface BillPaymentsByIdAdditionalInformationOutputDTO {
  drawee?: CalculateBillPaymentsDraweeDTO;
  beneficiary?: CalculateBillPaymentsFinalBeneficiaryDTO;
  finalBeneficiary?: CalculateBillPaymentsFinalBeneficiaryDTO;
  financialInstitution?: string;
  status?: string;
  typeAmountAccepted?: string;
  transactionRateValue?: number;
  details?: CalculateBillPaymentsDetailsDTO;
}
