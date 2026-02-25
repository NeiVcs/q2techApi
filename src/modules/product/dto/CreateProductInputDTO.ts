export interface CreateProductInputDTO {
  companyId: string;
  name: string;
  category: string;
  description: string;
  active?: boolean;
  isAdditional?: boolean;
  imgUrl?: string;
  price: number;
  previewPrice?: number;
  additionalIdList?: string[];
}