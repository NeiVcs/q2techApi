import { CompanyCategoriesListDTO } from "@modules/company/dto/CompanyCategoriesListDTO";
import { CompanyPlanDTO } from "@modules/company/dto/CompanyPlanDTO";
import { CompanyStylizationDTO } from "@modules/company/dto/CompanyStylizationDTO";
import { CompanyContactsDTO } from "@modules/company/dto/CompanyContactsDTO";
import { CompanySocialMediasListDTO } from "@modules/company/dto/CompanySocialMediasListDTO";
import { CompanyAddressDTO } from "@modules/company/dto/CompanyAddressDTO";
import { CompanyWorkScheduleDTO } from "@modules/company/dto/CompanyWorkScheduleDTO";

export interface FindByIdCompanyOutputDTO {
  id: string;
  name?: string;
  description?: string;
  url?: string;
  closed?: boolean;
  alert?: string;
  minOrderPrice?: number;
  categoriesList?: CompanyCategoriesListDTO[];
  plan?: CompanyPlanDTO[];
  stylization?: CompanyStylizationDTO;
  contacts?: CompanyContactsDTO;
  socialMediasList?: CompanySocialMediasListDTO[];
  address?: CompanyAddressDTO;
  workSchedule?: CompanyWorkScheduleDTO[];
  paymentForms?: string[];
}
