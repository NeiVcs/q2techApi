export interface FindByCompanyIdProductInputDTO {
  companyId?: string;
  name?: string;
  category?: string;
  active?: boolean;
  isAdditional?: boolean;
  page?: number;
  pageSize?: number;
}