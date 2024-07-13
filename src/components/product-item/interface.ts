import React from "react";
import { StyleProp, TextProps } from "react-native";
import { Product } from "../../api/products";

export type ProductItemProps = React.FC<
  StyleProp<any> &
    TextProps & {
      children: React.ReactNode;
      product: Product;
      onAddToCart: (product: Product) => void;
    }
>;
