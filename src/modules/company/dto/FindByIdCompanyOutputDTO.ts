import { CompanyAddressDTO } from "./CompanyAddressDTO";
import { CompanyCategoriesListDTO } from "./CompanyCategoriesListDTO";
import { CompanyContactsDTO } from "./CompanyContactsDTO";
import { CompanyPlanDTO } from "./CompanyPlanDTO";
import { CompanySocialMediasListDTO } from "./CompanySocialMediasListDTO";
import { CompanyStylizationDTO } from "./CompanyStylizationDTO";
import { CompanyWorkScheduleDTO } from "./CompanyWorkScheduleDTO";

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
