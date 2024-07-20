import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Product } from "../api/products";
import pako from "pako";

interface WishlistState {
  products: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

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

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      products: [],
      /**
       * Adds a product to the wishlist
       * @param product The product to be added to the cart
       */
      addItem: (product) =>
        set((state) => ({
          products: state.products.some((item) => item.id === product.id)
            ? state.products
            : [...state.products, product],
        })),
      removeItem: (productId: string) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId,
          ),
        })),
      clearWishlist: () => set({ products: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default useWishlistStore;
