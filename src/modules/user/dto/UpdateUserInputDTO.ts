import { UserCompanyDataListItemDTO } from "@modules/user/dto/UserCompanyDataListItemDTO";

export interface UpdateUserInputDTO {
  id: string;
  name?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
}
