import { StyleProp, TextProps } from "react-native";
import React from "react";
import { Product } from "../../api/products";

export type ProductCategoryProps = React.FC<
  StyleProp<any> &
    TextProps & {
      children: React.ReactNode;
      products: Product[];
      addToCart: (product: Product) => void;
    }
>;
