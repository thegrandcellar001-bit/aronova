import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, Variant } from "@/types/product.types";
import api from "@/lib/axios";
import { debouncedSyncCart } from "../utils";

export type CartItem = {
  product: Product;
  variant?: Variant;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartState {
  cart: Cart | null;
  totalPrice: number;
  action: "update" | "add" | "delete" | null;

  // Actions
  addToCart: (
    data: {
      product: Product;
      variant?: Variant;
      quantity?: number;
    },
    userId: string
  ) => Promise<void>;
  decreaseItem: (productId: string, variantId?: string) => Promise<void>;
  removeItem: (productId: string, variantId?: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Helpers
  recalculateTotals: () => void;
  syncCartWithServer: (action?: string) => Promise<void>;
  loadCartFromApi: () => Promise<void>;

  // Selectors
  getCartTotal: () => number;
  getItemCount: (id: string, variantId?: string) => number;
  isInCart: (id: string, variantId?: string) => boolean;
  getCartItems: () => CartItem[];
}

const getItemPrice = (product: Product, variant?: Variant): number => {
  if (variant) return variant.pricing.final_price;
  return product.pricing.final_price;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      totalPrice: 0,
      action: null,

      addToCart: async ({ product, variant, quantity = 1 }, userId) => {
        const state = get();
        const price = getItemPrice(product, variant);

        if (!state.cart) {
          const newCart: Cart = {
            items: [{ product, variant, quantity }],
            totalQuantities: quantity,
          };
          set({
            cart: newCart,
            totalPrice: price * quantity,
            action: "add",
          });
        } else {
          const existingItem = state.cart.items.find(
            (item) =>
              item.product.id === product.id &&
              (!variant || item.variant?.id === variant.id)
          );

          let updatedItems;
          if (existingItem) {
            updatedItems = state.cart.items.map((item) =>
              item.product.id === product.id &&
              (!variant || item.variant?.id === variant.id)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            updatedItems = [
              ...state.cart.items,
              { product, variant, quantity },
            ];
          }

          set({
            cart: {
              items: updatedItems,
              totalQuantities: state.cart.totalQuantities + quantity,
            },
            totalPrice: state.totalPrice + price * quantity,
            action: "update",
          });
        }

        // API sync
        debouncedSyncCart(() => get().syncCartWithServer("addToCart"));
      },

      decreaseItem: async (productId, variantId) => {
        const state = get();
        if (!state.cart) return;

        const updatedItems = state.cart.items
          .map((item) => {
            const matches =
              item.product.id === productId &&
              (!variantId || item.variant?.id === variantId);
            if (matches) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);

        set({
          cart: {
            items: updatedItems,
            totalQuantities: state.cart.totalQuantities - 1,
          },
          action: "update",
        });

        get().recalculateTotals();
        await get().syncCartWithServer();
      },

      removeItem: async (productId, variantId) => {
        const state = get();
        if (!state.cart) return;

        const updatedItems = state.cart.items.filter(
          (item) =>
            item.product.id !== productId ||
            (variantId && item.variant?.id !== variantId)
        );

        set({
          cart: {
            items: updatedItems,
            totalQuantities:
              state.cart.totalQuantities -
              (state.cart.items.find(
                (i) =>
                  i.product.id === productId &&
                  (!variantId || i.variant?.id === variantId)
              )?.quantity || 0),
          },
          action: "delete",
        });

        get().recalculateTotals();
        await get().syncCartWithServer();
      },

      clearCart: async () => {
        set({ cart: null, totalPrice: 0, action: null });
        await api.post("/cart/clear").catch(() => {});
      },

      recalculateTotals: () => {
        const state = get();
        if (!state.cart) {
          set({ totalPrice: 0 });
          return;
        }

        const total = state.cart.items.reduce((sum, item) => {
          const price = getItemPrice(item.product, item.variant);
          return sum + price * item.quantity;
        }, 0);

        set({ totalPrice: total });
      },

      loadCartFromApi: async () => {
        const state = get();
        try {
          const res = await api.get("/cart");

          const cartItems = res.data.items.map((item: any) => ({
            product: item.product,
            variant: item.variant || undefined,
            quantity: item.quantity,
          }));

          const totalQuantities = cartItems.reduce(
            (sum: number, i: any) => sum + i.quantity,
            0
          );

          set({
            cart: {
              items: cartItems,
              totalQuantities,
            },
            action: "update",
          });

          state.recalculateTotals();
        } catch (err) {
          console.warn("Failed to load cart from API:", err);
        }
      },

      syncCartWithServer: async (action = "") => {
        const state = get();
        if (!state.cart) return;

        try {
          if (action === "addToCart") {
            const lastItem = state.cart.items[state.cart.items.length - 1];
            await api.post("/cart/items", {
              product_id: lastItem.product.id,
              variant_id: lastItem.variant?.id,
              quantity: lastItem.quantity,
            });
          } else {
            await api.post("/cart/bulk", {
              items: state.cart.items.map((item) => ({
                product_id: item.product.id,
                variant_id: item.variant?.id,
                quantity: item.quantity,
              })),
              userID: "guest",
            });
          }
        } catch (err) {
          console.warn("Cart sync failed, using local cart instead.");
        }
      },

      getCartTotal: () => get().totalPrice,
      getItemCount: (id, variantId) => {
        const item = get().cart?.items.find(
          (i) =>
            i.product.id === id && (!variantId || i.variant?.id === variantId)
        );
        return item ? item.quantity : 0;
      },
      isInCart: (id, variantId) =>
        get().cart?.items.some(
          (i) =>
            i.product.id === id && (!variantId || i.variant?.id === variantId)
        ) ?? false,
      getCartItems: () => get().cart?.items || [],
    }),
    { name: "cartStore" }
  )
);
