import { UserCompanyDataListItemDTO } from "./UserCompanyDataListItemDTO";
export interface CreateUserInputDTO {
  name: string;
  password: string;
  taxId?: string;
  email: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
  createdAt?: string;
}
