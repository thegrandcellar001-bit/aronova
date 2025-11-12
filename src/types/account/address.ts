export interface AddressData {
  id: string;
  phone_number: string;
  additional_phone_number: string;
  additional_info?: string;
  delivery_address: string;
  state: string;
  lga: string;
  is_default: boolean;
}
