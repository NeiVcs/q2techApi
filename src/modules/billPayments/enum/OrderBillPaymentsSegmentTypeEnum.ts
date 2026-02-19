export const OrderBillPaymentsSegmentType = {
  BOLETO_PJ: 'BOLETO_PJ',
  BOLETO_PF: 'BOLETO_PF'
} as const;

export type OrderBillPaymentsSegmentTypeEnum = keyof typeof OrderBillPaymentsSegmentType;
