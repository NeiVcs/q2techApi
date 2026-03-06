import { UserAddressDTO } from "./UserAddressDTO";
import { UserBillingDTO } from "./UserBillingDTO";
import { UserPlanDTO } from "./UserPlanDTO";

export interface CreateUserInputDTO {
  companyId?: string;
  name: string;
  password: string;
  cpf: string;
  email: string;
  phoneNumber?: string;
  whatsapp?: string;
  position: string;
  resource?: string;
  active?: boolean;
  address: UserAddressDTO;
  plan?: UserPlanDTO;
  billing?: UserBillingDTO[];
  lastLogin?: string;
  createdAt?: string;
}
