export interface FindBillPaymentsByIdRatesItemDTO {
  id: string;
  name: string;
  value: number;
  codeRate: string;
  codeEvent: string;
  historySenderCode: number;
  historyRecipientCode: number;
  coin: string;
  type: 'FIXO' | 'PERCENTUAL';
}
