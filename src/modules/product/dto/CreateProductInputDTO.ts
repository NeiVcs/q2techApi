export interface CreateProductInputDTO {
  storeId: string;
  name: string;
  category: string;
  description: string;
  isActived?: boolean;
  imgUrl?: string;
  price: number;
  previewPrice?: number;
  additionalIdList?: string[];
}