

export interface IResponse {
  status: boolean;
  success: boolean;
  status_code: number;
  response?: string;
  message: string;
  data?: unknown; 
}

export interface Product {
  name: string;
  description: string | null;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string[] | null;
  unavailable: boolean;
  unavailable_start: string | null;
  unavailable_end: string | null;
  id: string;
  parent_product_id: string | null;
  parent: string | null;
  organization_id: string;
  stock_id: string | null;
  product_image: ProductImage[];
  categories: string[];
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: Photo[];
  prices: null;
  stocks: null;
  current_price: CurrentPrice[];
  is_deleted: boolean;
  available_quantity: number | null;
  selling_price: number | null;
  discounted_price: number | null;
  buying_price: number | null;
  extra_infos: null;
  featured_reviews: null;
  unavailability: any[];
}

export interface ProductImage {
  model_name: string;
  model_id: string;
  organization_id: string;
  filename: string;
  url: string;
  is_featured: boolean;
  save_as_jpg: boolean;
  is_public: boolean;
  file_rename: boolean;
  position: number;
}

export interface Photo {
  model_name: string;
  model_id: string;
  organization_id: string;
  filename: string;
  url: string;
  is_featured: boolean;
  save_as_jpg: boolean;
  is_public: boolean;
  file_rename: boolean;
  position: number;
}

export interface CurrentPrice {
  NGN: [number, null, any[]];
}

export interface ProductsResponse extends IResponse {
  items: Product[];
  // Add other response properties if any
}