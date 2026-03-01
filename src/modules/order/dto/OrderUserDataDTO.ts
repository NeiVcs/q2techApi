import { OrderAddressDTO } from "./OrderAddressDTO";

export interface OrderUserDataDTO {
  [x: string]: unknown;
  name?: string;
  phoneNumber?: string;
  address?: OrderAddressDTO;
}
