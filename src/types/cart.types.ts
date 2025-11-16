export interface CartItem {
  id: number;
  product_id: string;
  name: string;
  variant_id: string;
  subtotal: number;
  quantity: number;
  product: {
    id: string;
    category_slug: string;
    final_price: number;
    primary_image: string;
    pricing: {
      base_price: number;
      discount: number;
      final_price: number;
    };
  };
  variant?: CartVariant;
}

export interface CartVariant {
  id: string;
  product_id: string;
  color: string;
  size: string;
  final_price: number;
  available: number;
  pricing: {
    base_price: number;
    discount: number;
    final_price: number;
    price_adjustment: number;
    total_price: number;
  };
}

export interface CartProductProps {
  item: CartItem;
  userId: number;
  onCartChange?: () => void; // optional callback to refetch cart after change
}

export interface CartData {
  id: number;
  user_id: number;
  status: string;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}
