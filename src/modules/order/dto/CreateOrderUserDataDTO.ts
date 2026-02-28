import { CreateOrderAddressDTO } from "./CreateOrderAddressDTO";

export interface CreateOrderUserDataDTO {
  name: string;
  phoneNumber: string;
  address: CreateOrderAddressDTO;
}