import { CreateCompanyCategoriesListItemDTO } from "@modules/company/dto/CreateCompanyCategoriesListItemDTO";
import { CreateCompanyPlanItemDTO } from "@modules/company/dto/CreateCompanyPlanItemDTO";
import { CreateCompanyStylizationDTO } from "@modules/company/dto/CreateCompanyStylizationDTO";
import { CreateCompanyContactsDTO } from "@modules/company/dto/CreateCompanyContactsDTO";
import { CreateCompanyAddressDTO } from "@modules/company/dto/CreateCompanyAddressDTO";
import { CreateCompanyWorkScheduleItemDTO } from "@modules/company/dto/CreateCompanyWorkScheduleItemDTO";

export interface CreateCompanyInputDTO {
  name: string;
  description: string;
  url?: string;
  closed?: boolean;
  alert?: string;
  minOderPrice?: number;
  categoriesList?: CreateCompanyCategoriesListItemDTO[];
  plan?: CreateCompanyPlanItemDTO[];
  stylization?: CreateCompanyStylizationDTO;
  contacts?: CreateCompanyContactsDTO;
  address?: CreateCompanyAddressDTO;
  workSchedule?: CreateCompanyWorkScheduleItemDTO[];
  paymentForms?: string[];
}
    
    