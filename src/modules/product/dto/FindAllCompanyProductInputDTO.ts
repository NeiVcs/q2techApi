export interface FindAllCompanyProductInputDTO {
  companyId?: string;
  name?: string;
  category?: string;
  active?: boolean;
  isAdditional?: boolean;
  page?: number;
  pageSize?: number;
}