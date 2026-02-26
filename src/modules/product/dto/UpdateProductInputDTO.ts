export interface UpdateProductInputDTO {
  id: string;
  companyId: string;
  name: string;
  category: string;
  description: string;
  active?: boolean;
  isProduct?: boolean;
  imgUrl?: string;
  price: number;
  previewPrice?: number;
  ProductIdList?: string[];
}
