import { UserCompanyDataListItemDTO } from "./UserCompanyDataListItemDTO";

export interface FindByEmailUserOutputDTO {
  id?: string;
  taxId?: string;
  companyId?: string;
  resource?: string;
  name?: string;
  password?: string;
  active?: boolean;
  companyDataList?: UserCompanyDataListItemDTO[]
}
