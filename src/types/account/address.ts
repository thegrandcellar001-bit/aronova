export interface AddressData {
  id: number;
  phone_number: string;
  additional_phone_number: string;
  additional_info?: string;
  delivery_address: string;
  state: string;
  lga: string;
  is_default: boolean;
}

export interface AddressPayload {
  state: string;
  lga: string;
  delivery_address: string;
  phone_number: string;
  additional_phone_number: string;
  additional_info?: string;
  is_default: boolean;
}
