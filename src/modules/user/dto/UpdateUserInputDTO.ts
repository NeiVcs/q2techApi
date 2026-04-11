import { UserAddressDTO } from "@modules/user/dto/UserAddressDTO";
import { UserCompanyDataListItemDTO } from "@modules/user/dto/UserCompanyDataListItemDTO";

export interface UpdateUserInputDTO {
  id: string;
  name?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  address?: UserAddressDTO;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
}
