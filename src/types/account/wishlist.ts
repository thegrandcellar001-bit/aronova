export interface WishlistItem {
  name: string;
  media: {
    url: string;
  }[];
  merchant_id: string;
  base_price: string;
  product_id: string;
  added_at: string;
  sku: string;
}
