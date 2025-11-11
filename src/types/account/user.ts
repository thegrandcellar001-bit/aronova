export interface UserData {
  id?: number;
  name: string;
  email: string;
  country?: string;
  address?: string[];
}

export interface UserAddress {
  id?: string;
  lga: string;
  state: string;
  delivery_address: string;
  phone_number: string;
  additional_phone_number?: string;
  additional_info?: string;
  is_default: boolean;
}
