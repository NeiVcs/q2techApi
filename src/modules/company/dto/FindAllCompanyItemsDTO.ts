import { CompanyAddressDTO } from "./CompanyAddressDTO";
import { CompanyCategoriesListDTO } from "./CompanyCategoriesListDTO";
import { CompanyContactsDTO } from "./CompanyContactsDTO";
import { CompanyStylizationDTO } from "./CompanyStylizationDTO";
import { CompanyWorkScheduleDTO } from "./CompanyWorkScheduleDTO";

export interface FindAllCompanyItemsDTO {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  closed?: boolean;
  minOrderPrice?: number;
  categoriesList?: CompanyCategoriesListDTO[];
  stylization?: CompanyStylizationDTO;
  contacts?: CompanyContactsDTO;
  address?: CompanyAddressDTO;
  workSchedule?: CompanyWorkScheduleDTO[];
  paymentForms?: string[];
}