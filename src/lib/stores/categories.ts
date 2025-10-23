import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../axios";
import { Category } from "@/types/category.types";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  findCategoryBySlug: (slug: string) => Category | null;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: [],
      loading: false,

      fetchCategories: async () => {
        // prevent refetch if already cached
        if (get().categories.length > 0) return;

        set({ loading: true });
        try {
          const res = await api.get("/categories");
          set({ categories: res.data, loading: false });
        } catch (error) {
          console.error("Failed to fetch categories:", error);
          set({ loading: false });
        }
      },

      findCategoryBySlug: (slug: string) => {
        const category = get().categories.find(
          (cat) => cat.category_slug === slug
        );
        return category ? category : null;
      },

      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: "catStorage",
      partialize: (state) => ({ categories: state.categories }),
      onRehydrateStorage: () => (state) => {
        const lastFetched = localStorage.getItem("cat-last-fetched");
        if (!lastFetched || Date.now() - +lastFetched > 1000 * 60 * 60) {
          state?.fetchCategories();
          localStorage.setItem("cat-last-fetched", Date.now().toString());
        }
      },
    }
  )
);
