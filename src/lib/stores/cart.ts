import { create } from "zustand";
import { persist } from "zustand/middleware";
import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";

export type RemoveCartItem = {
  id: number;
  attributes: string[];
};

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
  addToCart: (item: CartItem) => void;
  removeCartItem: (data: RemoveCartItem) => void;
  remove: (data: RemoveCartItem & { quantity: number }) => void;
  clearCart: () => void;
}

const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  return (
    (totalPrice +
      (data.discount.percentage > 0
        ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
        : data.discount.amount > 0
        ? Math.round(data.price - data.discount.amount)
        : data.price)) *
    (quantity ?? data.quantity)
  );
};

export const useCartStore = create<CartsState>()(
  persist(
    (set, get) => ({
      cart: null,
      totalPrice: 0,
      adjustedTotalPrice: 0,
      action: null,

      addToCart: (payload) => {
        const state = get();

        // If cart is empty, initialize it
        if (!state.cart) {
          const totalPrice = payload.price * payload.quantity;
          const adjustedTotalPrice = calcAdjustedTotalPrice(
            totalPrice,
            payload
          );
          set({
            cart: {
              items: [payload],
              totalQuantities: payload.quantity,
            },
            totalPrice,
            adjustedTotalPrice,
            action: "add",
          });
          return;
        }

        // Check if item already in cart
        const existingItem = state.cart.items.find(
          (item) =>
            item.id === payload.id &&
            compareArrays(item.attributes, payload.attributes)
        );

        if (existingItem) {
          const updatedItems = state.cart.items.map((item) =>
            item.id === payload.id &&
            compareArrays(item.attributes, existingItem.attributes)
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          );

          const totalPrice =
            state.totalPrice + payload.price * payload.quantity;
          const adjustedTotalPrice =
            state.adjustedTotalPrice +
            calcAdjustedTotalPrice(state.totalPrice, payload);

          set({
            cart: {
              ...state.cart,
              items: updatedItems,
              totalQuantities: state.cart.totalQuantities + payload.quantity,
            },
            totalPrice,
            adjustedTotalPrice,
            action: "update",
          });
          return;
        }

        // Add as a new item
        const totalPrice = state.totalPrice + payload.price * payload.quantity;
        const adjustedTotalPrice =
          state.adjustedTotalPrice +
          calcAdjustedTotalPrice(state.totalPrice, payload);

        set({
          cart: {
            ...state.cart,
            items: [...state.cart.items, payload],
            totalQuantities: state.cart.totalQuantities + payload.quantity,
          },
          totalPrice,
          adjustedTotalPrice,
          action: "add",
        });
      },

      removeCartItem: (payload) => {
        const state = get();
        if (!state.cart) return;

        const existingItem = state.cart.items.find(
          (item) =>
            item.id === payload.id &&
            compareArrays(item.attributes, payload.attributes)
        );

        if (!existingItem) return;

        const updatedItems = state.cart.items
          .map((item) =>
            item.id === payload.id &&
            compareArrays(item.attributes, existingItem.attributes)
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        set({
          cart: {
            ...state.cart,
            items: updatedItems,
            totalQuantities: state.cart.totalQuantities - 1,
          },
          totalPrice: state.totalPrice - existingItem.price,
          adjustedTotalPrice:
            state.adjustedTotalPrice -
            calcAdjustedTotalPrice(existingItem.price, existingItem, 1),
          action: "delete",
        });
      },

      remove: (payload) => {
        const state = get();
        if (!state.cart) return;

        const existingItem = state.cart.items.find(
          (item) =>
            item.id === payload.id &&
            compareArrays(item.attributes, payload.attributes)
        );
        if (!existingItem) return;

        const updatedItems = state.cart.items.filter((item) =>
          item.id === payload.id
            ? !compareArrays(item.attributes, existingItem.attributes)
            : item.id !== payload.id
        );

        const totalPrice =
          state.totalPrice - existingItem.price * existingItem.quantity;
        const adjustedTotalPrice =
          state.adjustedTotalPrice -
          calcAdjustedTotalPrice(
            existingItem.price,
            existingItem,
            existingItem.quantity
          );

        set({
          cart: {
            ...state.cart,
            items: updatedItems,
            totalQuantities: state.cart.totalQuantities - existingItem.quantity,
          },
          totalPrice,
          adjustedTotalPrice,
          action: "delete",
        });
      },

      clearCart: () => {
        set({
          cart: null,
          totalPrice: 0,
          adjustedTotalPrice: 0,
          action: null,
        });
      },
    }),
    {
      name: "cartStore",
    }
  )
);
