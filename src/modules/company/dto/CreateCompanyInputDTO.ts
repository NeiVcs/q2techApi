import { CompanyCategoriesListDTO } from "@modules/company/dto/CompanyCategoriesListDTO";
import { CompanyPlanDTO } from "@modules/company/dto/CompanyPlanDTO";
import { CompanyStylizationDTO } from "@modules/company/dto/CompanyStylizationDTO";
import { CompanyContactsDTO } from "@modules/company/dto/CompanyContactsDTO";
import { CompanyAddressDTO } from "@modules/company/dto/CompanyAddressDTO";
import { CompanyWorkScheduleDTO } from "@modules/company/dto/CompanyWorkScheduleDTO";

export interface CreateCompanyInputDTO {
  name: string;
  description: string;
  url?: string;
  closed?: boolean;
  alert?: string;
  minOderPrice?: number;
  categoriesList?: CompanyCategoriesListDTO[];
  plan?: CompanyPlanDTO[];
  stylization?: CompanyStylizationDTO;
  contacts?: CompanyContactsDTO;
  address?: CompanyAddressDTO;
  workSchedule?: CompanyWorkScheduleDTO[];
  paymentForms?: string[];
}
