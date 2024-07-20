import React from "react";
import { Order } from "../../store/useOrderStore";

export type OrderItemProps = React.FC<{
  order: Order;
  itemIndex: number;
  onPress: () => void;
}>;
