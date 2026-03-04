import { UserAddressDTO } from "./UserAddressDTO";
import { UserBillingDTO } from "./UserBillingDTO";
import { UserPlanDTO } from "./UserPlanDTO";

export interface UserItemsDTO {
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