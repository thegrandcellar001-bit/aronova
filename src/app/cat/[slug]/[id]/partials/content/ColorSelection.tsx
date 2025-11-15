"use client";

import { cn } from "@/lib/utils";
import React from "react";
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
  setColorSelection: (color: string | null) => void;
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
            title={color}
            type="button"
            className={cn([
              "w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center cursor-pointer border",
              colorSelection === color ? "ring-2 ring-secondary" : "",
            ])}
            style={{ backgroundColor: color }}
            onClick={() => {
              const isSame = colorSelection === color;

              setColorSelection(isSame ? null : color);
              setSizeSelection(null);
              setSelectedVariant(null);
            }}
          >
            {colorSelection === color && (
              <i className="far fa-check text-base text-white" />
            )}
          </button>
        ))}
      </div>
      {colorSelection && (
        <div className="text-sm text-black/60 mt-4">
          <i className="far fa-info-circle mr-1"></i> Selected Color:{" "}
          <span className="capitalize">{colorSelection}</span>
        </div>
      )}
    </div>
  );
};

export default ColorSelection;
