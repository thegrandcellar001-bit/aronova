import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductsResponse } from "@/types/product.types";

interface ProductContextType {
  fetchProducts: (
    limit: number,
    offset?: number
  ) => Promise<ProductsResponse | undefined>;
  fetchCategoryProducts: (
    categorySlug: string,
    params: any
  ) => Promise<ProductsResponse | undefined>;
  fetchFilteredProducts: (
    filters: any
  ) => Promise<ProductsResponse | undefined>;
  fetchProductReviews: (
    productId: string,
    params: { limit: number; offset: number }
  ) => Promise<any>;
  loading: {
    products: boolean;
    category: boolean;
    filter: boolean;
    reviews: boolean;
  };
  status: {
    success: boolean;
    message: string | null;
  };
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState({
    products: false,
    category: false,
    filter: false,
    reviews: false,
  });
  const [status, setStatus] = useState({
    success: false,
    message: null as string | null,
  });
  const { toastSuccess, toastError } = useToast();

  const fetchProducts = async (limit: number = 20, offset?: number) => {
    setLoading((prev) => ({ ...prev, products: true }));

    try {
      const res = await api.get("/products", {
        params: { limit, offset: offset ?? 0 },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toastError("Failed to fetch products");
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const fetchCategoryProducts = async (categorySlug: string, params: any) => {
    setLoading((prev) => ({ ...prev, category: true }));

    try {
      const res = await api.get(`/products/filter`, {
        params: {
          category_slug: categorySlug,
          ...params,
        },
        paramsSerializer: {
          indexes: null,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching category products:", error);
      toastError("Failed to fetch category products");
    } finally {
      setLoading((prev) => ({ ...prev, category: false }));
    }
  };

  const fetchFilteredProducts = async (filters: any) => {
    setLoading((prev) => ({ ...prev, filter: true }));

    try {
      const res = await api.get<ProductsResponse>("/products/filter", {
        params: filters,
        paramsSerializer: {
          indexes: null,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toastError("Failed to fetch products");
    } finally {
      setLoading((prev) => ({ ...prev, filter: false }));
    }
  };

  const fetchProductReviews = async (
    productId: string,
    params: { limit: number; offset: number }
  ) => {
    setLoading((prev) => ({ ...prev, reviews: true }));
    try {
      const res = await api.get(`/${productId}/reviews`, { params });
      return res.data;
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      toastError("Failed to fetch product reviews");
    } finally {
      setLoading((prev) => ({ ...prev, reviews: false }));
    }
  };

  return (
    <ProductContext.Provider
      value={{
        fetchProducts,
        fetchCategoryProducts,
        fetchFilteredProducts,
        fetchProductReviews,
        loading,
        status,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
