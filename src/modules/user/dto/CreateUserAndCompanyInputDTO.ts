import { CreateCompanyInputDTO } from "@modules/company/dto/CreateCompanyInputDTO";
import { CreateUserInputDTO } from "./CreateUserInputDTO";

export interface CreateUserAndCompanyInputDTO {
  user: CreateUserInputDTO;
  company: CreateCompanyInputDTO;
}
