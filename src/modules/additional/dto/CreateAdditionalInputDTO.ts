export interface CreateAdditionalInputDTO {
  name: string;
  companyId: string;
  category: string;
  min: number;
  max: number;
  productIdList: string[];
}