export interface CalculateBillPaymentsRatesItemDTO {
  id: string;
  idServiceRate?: string;
  idProductRate?: string;
  name: string;
  value: number;
  codeRate: string;
  codeEvent: string;
  historySenderCode: number;
  historyRecipientCode: number;
  coin: string;
  type: string;
}
