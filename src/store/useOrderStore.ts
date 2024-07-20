import { create } from "zustand";

import { ICartItem } from "../components/cart-item/interface";
import {
  initDatabase,
  insertOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
} from "../utils/database";

export interface Order {
  id: string;
  items: ICartItem[];
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
  paymentDeadline: Date;
  deliveryAddress: string;
  phoneNumber1: string;
  phoneNumber2?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (
    orderData: Omit<Order, "createdAt" | "updatedAt">,
  ) => Promise<Order>;
  updateOrder: (
    orderId: string,
    newStatus: "pending" | "completed" | "canceled",
  ) => Promise<void>;
  getOrderById: (orderId: string) => Promise<Order | undefined>;
  loadOrders: () => Promise<void>;
}

const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  addOrder: async (orderData) => {
    const newOrder: Order = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await insertOrder(newOrder);
    set((state) => ({ orders: [newOrder, ...state.orders] }));
    return newOrder;
  },
  updateOrder: async (orderId, newStatus) => {
    const updatedAt = new Date();
    await updateOrderStatus(orderId, newStatus, updatedAt.toISOString());
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt }
          : order,
      ),
    }));
  },
  getOrderById: async (orderId) => {
    return await getOrderById(orderId);
  },
  loadOrders: async () => {
    await initDatabase();
    const orders = await getAllOrders();
    set({ orders });
  },
}));

export default useOrderStore;
