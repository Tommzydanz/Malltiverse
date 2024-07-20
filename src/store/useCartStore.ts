import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import pako from "pako";
import { ICartItem } from "../components/cart-item/interface";
import { Product } from "../api/products";

interface CartState {
  cart: ICartItem[];
  addToCart: (product: Omit<ICartItem, "quantity">) => void;

  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => Promise<void>;
}

export const selectCartItemsCount = (state: CartState) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);

// compress data
const compressData = (data: string) => {
  const stringData = JSON.stringify(data);
  const compressed = pako.deflate(stringData);
  return btoa(String.fromCharCode.apply(null, Array.from(compressed)));
};

const decompressData = (compressedData: string) => {
  const charData = atob(compressedData)
    .split("")
    .map((x) => x.charCodeAt(0));
  const decompressed = pako.inflate(new Uint8Array(charData));
  return JSON.parse(new TextDecoder().decode(decompressed));
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log("Retrieved from storage:", name);
    const compressedValue = await SecureStore.getItemAsync(name);
    if (compressedValue) {
      return decompressData(compressedValue);
    }
    return null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const compressedValue = compressData(value);
    await SecureStore.setItemAsync(name, compressedValue);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      /**
       * Adds a product to the cart or increments its quantity if already present
       * @param product The product to be added to the cart
       */
      addToCart: (product: Product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      updateCartItemQuantity: (productId: string, newQuantity: number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item,
          ),
        })),

      removeFromCart: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      /**
       * Clears all items from the cart
       */
      clearCart: async () => {
        set({ cart: [] });

        // Clear the data from SecureStore
        await SecureStore.deleteItemAsync("cart-storage");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
);
