// api.ts

import { createAxiosQuery } from "../../utils/axios-utils";
import { baseUrl } from "../../utils/constants";
import { Product, ProductsResponse, RatingResponse } from "./interface";

const axiosQuery = createAxiosQuery({
  baseUrl: baseUrl,
  baseHeaders: {
    "Content-Type": "application/json",
  },
});

// API functions
export const getProducts = async (): Promise<ProductsResponse | null> => {
  const result = await axiosQuery<ProductsResponse>({
    url: "/products",
    method: "GET",
  });

  if (result.error) {
    console.error("Error fetching products:", result.error);
    return null;
  }

  return result.data || null;
};

export const getProductRating = async (
  productId: string,
): Promise<number | null> => {
  const result = await axiosQuery<RatingResponse>({
    url: `/extrainfo/products/${productId}`,
    method: "GET",
  });

  if (result.error) {
    console.error(
      `Error fetching rating for product ${productId}:`,
      result.error,
    );
    return null;
  }

  if (result.data && Array.isArray(result.data)) {
    const ratingInfo = result.data.find((info) => info.key === "rating");
    return ratingInfo ? parseFloat(ratingInfo.value) : null;
  }

  return null;
};

// Function to get products with ratings
export const getProductsWithRatings =
  async (): Promise<ProductsResponse | null> => {
    try {
      const productsResult = await getProducts();

      if (!productsResult || !productsResult.items) {
        console.error("No products data received");
        return null;
      }

      const productsWithRatings: Product[] = await Promise.all(
        productsResult.items.map(async (product) => {
          try {
            const rating = await getProductRating(product.id);
            return {
              ...product,
              rating: rating !== null ? rating : undefined,
            };
          } catch (error) {
            console.error(
              `Error fetching rating for product ${product.id}:`,
              error,
            );
            return {
              ...product,
              rating: undefined,
            };
          }
        }),
      );

      return {
        ...productsResult,
        items: productsWithRatings,
      };
    } catch (error) {
      console.error("Error in getProductsWithRatings:", error);
      return null;
    }
  };
