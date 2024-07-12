import React from "react";
import { ImageSourcePropType, StyleProp, TextProps } from "react-native";
import { Product } from "../../api/products";

export type ProductItemProps = React.FC<StyleProp<any> &
TextProps & {
  children: React.ReactNode;
  product: Product;
  onPress: () => void;
}>;

