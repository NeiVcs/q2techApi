export interface UpdateAdditionalInputDTO {
  id: string;
  companyId?: string;
  category?: string;
  name?: string;
  min?: number;
  max?: number;
  productIdList?: string[];
}