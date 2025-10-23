export interface Review {
  id: number;
  product_id: string;
  rating: number;
  comment: string;
  user_id: number;
  user_name: string;
  created_at: string;
}

export interface HomeReviews {
  id: number;
  user_name: string;
  comment: string;
  rating: number;
  created_at: string;
}
