import { UserBillingItemDTO } from "./UserBillingItemDTO";
import { UserPlanDTO } from "./UserPlanDTO";

export interface UserCompanyDataListItemDTO {
  [x: string]: unknown;
  companyId?: string;
  resource?: string;
  plan?: UserPlanDTO;
  billing?: UserBillingItemDTO[];
}
