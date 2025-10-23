export interface ProductsResponse {
  limit: number;
  offset: number;
  total: number;
  products: Product[];
}

export interface Product {
  average_rating: number;
  category_name: string;
  category_slug: string;
  created_at: string;
  description: string;
  id: string;
  images: string[];
  inventory: Inventory;
  merchant_id: string;
  merchant_name: string;
  merchant_store_name: string;
  name: string;
  pricing: Pricing;
  reviews: Review[];
  slug: string;
  updated_at: string;
  variants: Variant[];
}

export interface Inventory {
  available: number;
  backorder_allowed: boolean;
  id: string;
  low_stock_threshold: number;
  quantity: number;
  reserved: number;
  status: string;
}

export interface Pricing {
  base_price: number;
  discount: number;
  final_price: number;
}

export interface Review {
  comment: string;
  created_at: string;
  product_name: string;
  rating: number;
  updated_at: string;
  user_name: string;
}

export interface Variant {
  color: string;
  created_at: string;
  id: string;
  inventory: Inventory;
  is_active: boolean;
  pricing: VariantPricing;
  product_id: string;
  size: string;
  updated_at: string;
}

export interface VariantPricing extends Pricing {
  price_adjustment: number;
  total_price: number;
}
