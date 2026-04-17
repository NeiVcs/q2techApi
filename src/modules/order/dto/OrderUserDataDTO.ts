import { OrderAddressDTO } from "./OrderAddressDTO";

export interface OrderUserDataDTO {
  [x: string]: unknown;
  userId?: string;
  name?: string;
  phoneNumber?: string;
  address?: OrderAddressDTO;
}
