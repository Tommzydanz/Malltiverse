// api.ts

import { createAxiosQuery } from "../../utils/axios-utils";
import { baseUrl } from "../../utils/constants";
import { ProductsResponse } from "./interface";

const axiosQuery = createAxiosQuery({
  baseUrl: baseUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getProducts = async (): Promise<ProductsResponse | null> => {
  const result = await axiosQuery<ProductsResponse>({
    url: "/products",
    method: "GET",
  });

  if (result.error) {
    console.error('Error fetching products:', result.error);
    return null;
  }

  return result.data || null;
};