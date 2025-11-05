export interface CartItem {
  id: number;
  product_id: string;
  variant_id?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartVariant {
  id: string;
  product_id: string;
  color: string;
  size: string;
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
