import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import { WishlistItem } from "@/types/wishlist.types";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth";

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: {
    global: boolean;
    add: boolean;
    remove: boolean;
    clear: boolean;
  };
  status: {
    success: boolean;
    message: string | null;
  };
  refreshWishlist: () => Promise<void>;
  addItem: (params: {
    productId: string;
    quantity: number;
    variantId?: string;
  }) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearItems: () => Promise<void>;
  itemExists: (productId: string) => boolean;
  itemsCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState({
    global: false,
    add: false,
    remove: false,
    clear: false,
  });
  const [status, setStatus] = useState({
    success: false,
    message: null as string | null,
  });
  const { toastSuccess, toastError } = useToast();

  const fetchWishlistData = async () => {
    setLoading((prev) => ({ ...prev, global: true }));
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.items as WishlistItem[]);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toastError("Failed to fetch wishlist");
    } finally {
      setLoading((prev) => ({ ...prev, global: false }));
    }
  };

  const addItem = async ({
    productId,
    quantity,
    variantId,
  }: {
    productId: string;
    quantity: number;
    variantId?: string;
  }) => {
    setLoading((prev) => ({ ...prev, add: true }));
    try {
      await api.post("/wishlist", {
        product_id: productId,
        quantity,
        variant_id: variantId,
      });
      await fetchWishlistData();
      setStatus({ success: true, message: "Item added to wishlist" });
      toastSuccess("Item added to wishlist");
    } catch (error) {
      console.error("Error adding item:", error);
      setStatus({ success: false, message: "Failed to add item" });
      toastError("Failed to add item to wishlist");
    } finally {
      setLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const removeItem = async (productId: string) => {
    setLoading((prev) => ({ ...prev, remove: true }));
    try {
      await api.delete(`/wishlist/${productId}`);
      await fetchWishlistData();
      setStatus({ success: true, message: "Item removed from wishlist" });
      toastSuccess("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      setStatus({ success: false, message: "Failed to remove item" });
      toastError("Failed to remove item");
    } finally {
      setLoading((prev) => ({ ...prev, remove: false }));
    }
  };

  const clearItems = async () => {
    setLoading((prev) => ({ ...prev, clear: true }));
    try {
      await api.delete("/wishlist/clear");
      await fetchWishlistData();
      setStatus({ success: true, message: "Wishlist cleared" });
      toastSuccess("Wishlist cleared");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      setStatus({ success: false, message: "Failed to clear wishlist" });
      toastError("Failed to clear wishlist");
    } finally {
      setLoading((prev) => ({ ...prev, clear: false }));
    }
  };

  const itemExists = (productId: string) =>
    wishlist.some((item) => item.product_id === productId);

  const itemsCount = wishlist.length;

  useEffect(() => {
    if (isAuthenticated && wishlist.length === 0) fetchWishlistData();
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        itemsCount,
        loading,
        status,
        refreshWishlist: fetchWishlistData,
        addItem,
        removeItem,
        clearItems,
        itemExists,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
