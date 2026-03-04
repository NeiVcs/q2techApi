export interface UserBillingDTO {
  [x: string]: unknown;
  dueDate?: string;
  value?: number;
  status?: string;
}