import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import api from "@/lib/axios";
import { Category } from "@/types/category.types";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  findCategoryBySlug: (slug: string) => Category | null;
  refreshCategories: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

const CATEGORY_CACHE_KEY = "catStorage";
const LAST_FETCH_KEY = "cat-last-fetched";
const CACHE_LIFETIME = 1000 * 60 * 60; // 1 hour

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    // prevent refetch if cached and still fresh
    const lastFetched = localStorage.getItem(LAST_FETCH_KEY);
    if (
      categories.length > 0 &&
      lastFetched &&
      Date.now() - +lastFetched < CACHE_LIFETIME
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
      localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify(res.data));
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, [categories]);

  const refreshCategories = useCallback(() => {
    localStorage.removeItem(LAST_FETCH_KEY);
    fetchCategories();
  }, [fetchCategories]);

  const findCategoryBySlug = useCallback(
    (slug: string) => {
      return categories.find((cat) => cat.category_slug === slug) || null;
    },
    [categories]
  );

  useEffect(() => {
    // try load from cache on mount
    const cached = localStorage.getItem(CATEGORY_CACHE_KEY);
    if (cached) setCategories(JSON.parse(cached));

    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        findCategoryBySlug,
        refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider");
  }
  return context;
}
