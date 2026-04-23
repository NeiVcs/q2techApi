import { UserCompanyDataListItemDTO } from "@modules/user/dto/UserCompanyDataListItemDTO";

export interface UserItemsDTO {
  id?: string;
  name?: string;
  email?: string;
  taxId?: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
  createdAt?: string;
}
