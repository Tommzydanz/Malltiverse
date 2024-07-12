import React from "react";


export type CartItemProps = React.FC<{
  cart: ICartItem;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}>;

export interface ICartItem extends Product {
  quantity: number;
}
