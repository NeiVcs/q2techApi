export interface UserBillingItemDTO {
  [x: string]: unknown;
  dueDate?: string;
  value?: number;
  status?: string;
}