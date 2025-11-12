"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Product } from "@/types/product.types";

const ColorSelection = ({
  data,
  colorSelection,
  setColorSelection,
  setSizeSelection,
  setSelectedVariant,
}: {
  data: Product;
  colorSelection: string | null;
  setColorSelection: (color: string) => void;
  setSizeSelection: (size: string | null) => void;
  setSelectedVariant: (variant: any) => void;
}) => {
  const colors = data.variants
    ? Array.from(new Set(data.variants.map((v) => v.color)))
    : [];

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Color
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {colors.map((color, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center cursor-pointer border",
              colorSelection === color ? "border-black" : "border-gray-300",
            ])}
            style={{ backgroundColor: color }}
            onClick={() => {
              setColorSelection(color);
              setSizeSelection(null); // reset size when color changes
              setSelectedVariant(null);
            }}
          >
            {colorSelection === color && (
              <IoMdCheckmark className="text-base text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
