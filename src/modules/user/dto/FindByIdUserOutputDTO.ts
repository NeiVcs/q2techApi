import { UserAddressDTO } from '@modules/user/dto/UserAddressDTO';
import { UserPlanDTO } from '@modules/user/dto/UserPlanDTO';
import { UserBillingDTO } from '@modules/user/dto/UserBillingDTO';

export interface FindByIdUserOutputDTO {
  id?: string;
  companyId?: string;
  name?: string;
  email?: string;
  cpf?: string;
  phoneNumber?: string;
  whatsapp?: string;
  position?: string;
  resource?: string;
  active?: boolean;
  address?: UserAddressDTO;
  plan?: UserPlanDTO;
  billing?: UserBillingDTO[];
  lastLogin?: string;
  createdAt?: string;
}
