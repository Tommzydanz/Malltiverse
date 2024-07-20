import * as SQLite from "expo-sqlite";
import { Order } from "../store/useOrderStore";
import { ICartItem } from "../components/cart-item/interface";

const db = SQLite.openDatabaseSync("orders.db");

export const initDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY NOT NULL,
      items TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      paymentDeadline TEXT NOT NULL,
      deliveryAddress TEXT NOT NULL,
      phoneNumber1 TEXT NOT NULL,
      phoneNumber2 TEXT
    );
  `);
};

export const insertOrder = async (order: Order) => {
  const result = await db.runAsync(
    "INSERT INTO orders (id, items, status, createdAt, updatedAt, paymentDeadline, deliveryAddress, phoneNumber1, phoneNumber2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      order.id,
      JSON.stringify(order.items),
      order.status,
      order.createdAt.toISOString(),
      order.updatedAt.toISOString(),
      order.paymentDeadline.toISOString(),
      order.deliveryAddress,
      order.phoneNumber1,
      order.phoneNumber2 || null,
    ],
  );
  return result.lastInsertRowId;
};

export const updateOrderStatus = async (
  orderId: string,
  newStatus: string,
  updatedAt: string,
) => {
  await db.runAsync(
    "UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?",
    [newStatus, updatedAt, orderId],
  );
};

export const getAllOrders = async (): Promise<Order[]> => {
  const rows = await db.getAllAsync<Record<string, any>>(
    "SELECT * FROM orders ORDER BY createdAt DESC",
  );
  return rows.map((row) => ({
    id: row.id,
    items: JSON.parse(row.items) as ICartItem[],
    status: row.status as "pending" | "completed" | "canceled",
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
    paymentDeadline: new Date(row.paymentDeadline),
    deliveryAddress: row.deliveryAddress,
    phoneNumber1: row.phoneNumber1,
    phoneNumber2: row.phoneNumber2 || undefined,
  }));
};

export const getOrderById = async (
  orderId: string,
): Promise<Order | undefined> => {
  const row = await db.getFirstAsync<Record<string, any>>(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
  );
  if (row) {
    return {
      id: row.id,
      items: JSON.parse(row.items) as ICartItem[],
      status: row.status as "pending" | "completed" | "canceled",
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      paymentDeadline: new Date(row.paymentDeadline),
      deliveryAddress: row.deliveryAddress,
      phoneNumber1: row.phoneNumber1,
      phoneNumber2: row.phoneNumber2 || undefined,
    };
  }
  return undefined;
};
