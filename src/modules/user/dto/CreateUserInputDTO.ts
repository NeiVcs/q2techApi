import { UserAddressDTO } from "@modules/user/dto/UserAddressDTO";
import { UserCompanyDataListItemDTO } from "./UserCompanyDataListItemDTO";
export interface CreateUserInputDTO {
  name: string;
  password: string;
  taxId?: string;
  email: string;
  phoneNumber?: string;
  whatsapp?: string;
  position: string;
  resource?: string;
  active?: boolean;
  address: UserAddressDTO;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
  createdAt?: string;
}
