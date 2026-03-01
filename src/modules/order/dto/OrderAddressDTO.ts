export interface OrderAddressDTO {
  [x: string]: unknown;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  reference?: string;
}
