import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Variant } from "@/types/product.types";

interface ProductsState {
  colorSelection: string | null; // now just the color name, e.g. "blue"
  sizeSelection: string | null; // "M", "L", etc.
  selectedVariant: Variant | null;
  setColorSelection: (color: string) => void;
  setSizeSelection: (size: string | null) => void;
  setSelectedVariant: (variant: Variant | null) => void;
  resetSelections: () => void;
}

export const useProductStore = create<ProductsState>()(
  persist(
    (set) => ({
      colorSelection: null,
      sizeSelection: null,
      selectedVariant: null,

      setColorSelection: (color) =>
        set({
          colorSelection: color,
          sizeSelection: null, // reset size when color changes
          selectedVariant: null,
        }),

      setSizeSelection: (size) => set({ sizeSelection: size }),

      setSelectedVariant: (variant) => set({ selectedVariant: variant }),

      resetSelections: () =>
        set({
          colorSelection: null,
          sizeSelection: null,
          selectedVariant: null,
        }),
    }),
    {
      name: "productStore", // still persisted in localStorage
    }
  )
);
