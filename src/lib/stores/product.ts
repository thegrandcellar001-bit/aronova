import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Color = {
  name: string;
  code: string;
};

interface ProductsState {
  colorSelection: Color;
  sizeSelection: string;
  setColorSelection: (color: Color) => void;
  setSizeSelection: (size: string) => void;
  resetSelections: () => void;
}

export const useProductStore = create<ProductsState>()(
  persist(
    (set) => ({
      colorSelection: {
        name: "Brown",
        code: "bg-[#4F4631]",
      },
      sizeSelection: "Large",

      setColorSelection: (color) => set({ colorSelection: color }),
      setSizeSelection: (size) => set({ sizeSelection: size }),

      resetSelections: () =>
        set({
          colorSelection: {
            name: "Brown",
            code: "bg-[#4F4631]",
          },
          sizeSelection: "Large",
        }),
    }),
    {
      name: "productStore", // localStorage key
    }
  )
);
