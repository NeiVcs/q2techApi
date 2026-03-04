import { CreateUserAddressDTO } from "@modules/user/dto/CreateUserAddressDTO";
import { CreateUserPlanDTO } from "@modules/user/dto/CreateUserPlanDTO";
import { CreateUserBillingItemDTO } from "@modules/user/dto/CreateUserBillingItemDTO";

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
  address: CreateUserAddressDTO;
  plan?: CreateUserPlanDTO;
  billing?: CreateUserBillingItemDTO[];
  lastLogin?: string;
  createdAt?: string;
}
    
    