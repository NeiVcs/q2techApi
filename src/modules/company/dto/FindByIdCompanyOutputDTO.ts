import { FindByIdCompanyCategoriesListItemDTO } from "@modules/company/dto/FindByIdCompanyCategoriesListItemDTO";

import { FindByIdCompanyPlanItemDTO } from "@modules/company/dto/FindByIdCompanyPlanItemDTO";

import { FindByIdCompanyStylizationDTO } from "@modules/company/dto/FindByIdCompanyStylizationDTO";

import { FindByIdCompanyContactsDTO } from "@modules/company/dto/FindByIdCompanyContactsDTO";

import { FindByIdCompanySocialMediasListItemDTO } from "@modules/company/dto/FindByIdCompanySocialMediasListItemDTO";

import { FindByIdCompanyAddressDTO } from "@modules/company/dto/FindByIdCompanyAddressDTO";

import { FindByIdCompanyWorkScheduleItemDTO } from "@modules/company/dto/FindByIdCompanyWorkScheduleItemDTO";

export interface FindByIdCompanyOutputDTO {
  id: string;
  name?: string;
  description?: string;
  url?: string;
  closed?: boolean;
  alert?: string;
  minOrderPrice?: number;
  categoriesList?: FindByIdCompanyCategoriesListItemDTO[];
  plan?: FindByIdCompanyPlanItemDTO[];
  stylization?: FindByIdCompanyStylizationDTO;
  contacts?: FindByIdCompanyContactsDTO;
  socialMediasList?: FindByIdCompanySocialMediasListItemDTO[];
  address?: FindByIdCompanyAddressDTO;
  workSchedule?: FindByIdCompanyWorkScheduleItemDTO[];
  paymentForms?: string[];
}