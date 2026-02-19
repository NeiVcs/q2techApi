export interface FindBillPaymentsListInputDTO {
  page: number;
  pageSize: number;
  status?: string;
  segment?: string;
  id?: string;
  startDate?: string;
  endDate?: string;
  entityId: string;
}
