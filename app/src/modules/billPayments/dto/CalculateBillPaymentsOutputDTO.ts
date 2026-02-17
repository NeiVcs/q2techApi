import { CalculateBillPaymentsDraweeDTO } from '@modules/billPayments/dto/CalculateBillPaymentsDraweeDTO';

import { CalculateBillPaymentsBeneficiaryDTO } from '@modules/billPayments/dto/CalculateBillPaymentsBeneficiaryDTO';

import { CalculateBillPaymentsFinalBeneficiaryDTO } from '@modules/billPayments/dto/CalculateBillPaymentsFinalBeneficiaryDTO';

import { CalculateBillPaymentsDetailsDTO } from '@modules/billPayments/dto/CalculateBillPaymentsDetailsDTO';
import { CalculateBillPaymentsRatesItemDTO } from '@modules/billPayments/dto/CalculateBillPaymentsRatesItemDTO';

export interface CalculateBillPaymentsOutputDTO {
  typeAmountAccepted: number;
  drawee: CalculateBillPaymentsDraweeDTO;
  beneficiary: CalculateBillPaymentsBeneficiaryDTO;
  finalBeneficiary: CalculateBillPaymentsFinalBeneficiaryDTO;
  details: CalculateBillPaymentsDetailsDTO;
  financialInstitution: string;
  status: string;
  transactionRateValue: number;
  totalOrderValue: number;
  rates: CalculateBillPaymentsRatesItemDTO[];
}
