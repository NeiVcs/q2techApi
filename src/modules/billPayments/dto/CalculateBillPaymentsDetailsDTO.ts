export interface CalculateBillPaymentsDetailsDTO {
  barcode?: string;
  typeableLine?: string;
  dueDate?: string;
  faceValue?: number;
  interest?: number;
  fine?: number;
  discount?: number;
  totalAmount?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  consolidatedAmount?: number;
  documentType?: string;
  startHour?: string;
  endHour?: string;
  hourTimezone?: string;
}
