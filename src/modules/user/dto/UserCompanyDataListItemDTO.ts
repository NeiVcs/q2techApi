import { UserBillingItemDTO } from "./UserBillingItemDTO";
import { UserPlanDTO } from "./UserPlanDTO";

export interface UserCompanyDataListItemDTO {
  [x: string]: unknown;
  companyId?: string;
  plan?: UserPlanDTO;
  billing?: UserBillingItemDTO[];
}
