import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useRef,
  useState,
} from "react";
import api from "@/lib/axios";
import { debounce } from "@/lib/utils";
import { CartItem } from "@/types/cart.types";
import { Product } from "@/types/product.types";
import { useAuthStore } from "@/lib/stores/auth";
import { useToast } from "@/hooks/use-toast";

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };
const CartContext = createContext<any>(null);

function reducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case "SET":
      return { items: action.payload };

    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      const updated = exists
        ? state.items.map((i) =>
            i.id === exists.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items: updated };
    }

    case "REMOVE": {
      const updated = state.items.filter((i) => i.id !== action.payload);
      return { items: updated };
    }

    case "UPDATE_QTY": {
      const updated = state.items
        .map((i) =>
          i.id === action.payload.item_id
            ? action.payload.item ?? { ...i, quantity: action.payload.quantity }
            : i
        )
        .filter((i) => i.quantity > 0);

      return { items: updated };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const prevSnapshot = useRef<CartState | null>(null);
  const [status, setStatus] = useState({
    success: false,
    message: null as string | null,
  });
  const { toastSuccess, toastError } = useToast();

  function snapshot() {
    prevSnapshot.current = JSON.parse(JSON.stringify(state));
  }

  function rollback() {
    if (prevSnapshot.current)
      dispatch({ type: "SET", payload: prevSnapshot.current.items });
  }

  async function loadCart() {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      const mapped = res.data.items.map((i: any) => ({
        id: i.id,
        product_id: i.product_id,
        name: i.name,
        quantity: i.quantity,
        variant_id: i.variant_id,
        product: {
          id: i.product.id,
          category_slug: i.product.category_slug,
          final_price: i.variant?.final_price ?? i.product.final_price,
          primary_image: i.product.primary_image,
          pricing: i.product.pricing,
        },
        variant: i.variant,
      }));

      dispatch({ type: "SET", payload: mapped });
    } catch (err) {
      console.error("Failed to load cart", err);
      toastError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  async function addItem(item: Product, quantity: number, variant_id?: string) {
    snapshot();

    setAddLoading(true);
    dispatch({ type: "ADD", payload: item });

    try {
      await api.post("/cart/items", {
        product_id: item.id,
        quantity,
        ...(variant_id && { variant_id }),
      });
      setStatus({ success: true, message: "Item added to cart." });
      toastSuccess("Item added to cart.");
    } catch {
      rollback();
      setStatus({ success: false, message: "Failed to add item to cart." });
      toastError("Failed to add item to cart");
    } finally {
      setAddLoading(false);
    }
  }

  async function removeItem(item_id: string) {
    snapshot();

    setRemoveLoading(true);
    dispatch({ type: "REMOVE", payload: item_id });
    try {
      await api.delete(`/cart/items/${item_id}`);
      setStatus({ success: true, message: "Item removed from cart." });
      toastSuccess("Item removed from cart");
    } catch {
      rollback();
      setStatus({
        success: false,
        message: "Failed to remove item from cart.",
      });
      toastError("Failed to remove item from cart");
    } finally {
      setRemoveLoading(false);
    }
  }

  const debouncedSync = useRef(
    debounce(async (item_id: number, quantity: number) => {
      setUpdateLoading(true);
      try {
        const res = await api.put(`/cart/items/${item_id}`, { quantity });
        const items = res.data.items;
        const updatedItem = items.find((i: CartItem) => i.id === item_id);
        // Apply update from server (authoritative)
        dispatch({
          type: "UPDATE_QTY",
          payload: { item_id, quantity: updatedItem.quantity },
        });
        setStatus({ success: true, message: "Item quantity updated." });
        toastSuccess("Item quantity updated");
      } catch (err) {
        loadCart();
        setStatus({
          success: false,
          message: "Failed to update item quantity.",
        });
        toastError("Failed to update item quantity");
      } finally {
        setUpdateLoading(false);
      }
    }, 400)
  ).current;

  function updateQty(item_id: number, quantity: number) {
    dispatch({ type: "UPDATE_QTY", payload: { item_id, quantity } });
    debouncedSync(item_id, quantity);
  }

  async function clearCart() {
    snapshot();
    dispatch({ type: "CLEAR" });

    try {
      await api.post("/cart/clear");
      setStatus({ success: true, message: "Cart cleared." });
      toastSuccess("Cart cleared");
    } catch {
      rollback();
      setStatus({ success: false, message: "Failed to clear cart." });
      toastError("Failed to clear cart");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        state,
        totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
        status,
        addItem,
        addLoading,
        removeItem,
        removeLoading,
        loading,
        updateLoading,
        increaseQuantity: (item_id: number) =>
          updateQty(
            item_id,
            (state.items.find((i) => i.id === item_id)?.quantity ?? 0) + 1
          ),
        decreaseQuantity: (item_id: number) =>
          updateQty(
            item_id,
            (state.items.find((i) => i.id === item_id)?.quantity ?? 1) - 1
          ),
        clearCart,
        reloadCart: loadCart,
        inCart: (product_id: string) =>
          state.items.find((i) => i.product_id === product_id),
        findItem: (product_id: string) =>
          state.items.find((i) => i.product_id === product_id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
