export interface CartItem {
  id: number;
  product_id: string;
  variant_id?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartProductProps {
  item: CartItem;
  userId: number;
  onCartChange?: () => void; // optional callback to refetch cart after change
}
