import { UpdateUserAddressDTO } from "@modules/user/dto/UpdateUserAddressDTO";
import { UpdateUserPlanDTO } from "@modules/user/dto/UpdateUserPlanDTO";
import { UpdateUserBillingItemDTO } from "@modules/user/dto/UpdateUserBillingItemDTO";

export interface UpdateUserInputDTO {
  id: string;
  name?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  whatsapp?: string;
  position?: string;
  resource?: string;
  active?: boolean;
  address?: UpdateUserAddressDTO;
  plan?: UpdateUserPlanDTO;
  billing?: UpdateUserBillingItemDTO[];
  lastLogin?: string;
}
    
    