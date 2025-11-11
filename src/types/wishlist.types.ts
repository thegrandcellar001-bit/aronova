export interface WishlistItem {
  product_id: string;
  name: string;
  total_price: number;
  primary_image: string;
  category_slug: string;
  discount: number;
  discount_type: string;
  sku: string;
  merchant_id: string;
  added_at: Date;
}
