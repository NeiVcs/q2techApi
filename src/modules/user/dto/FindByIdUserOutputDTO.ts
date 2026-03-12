import { UserAddressDTO } from '@modules/user/dto/UserAddressDTO';
import { UserCompanyDataListItemDTO } from '@modules/user/dto/UserCompanyDataListItemDTO';

export interface FindByIdUserOutputDTO {
  id?: string;
  name?: string;
  email?: string;
  taxId?: string;
  phoneNumber?: string;
  whatsapp?: string;
  active?: boolean;
  address?: UserAddressDTO;
  companyDataList?: UserCompanyDataListItemDTO[];
  lastLogin?: string;
  createdAt?: string;
}