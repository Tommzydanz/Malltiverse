import { Product } from "../api/products";

export type RootStackParamList = {
    Products: undefined,
    ProductDetails: { product: Product };
  };