"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Product } from "@/types/product.types";

const SizeSelection = ({
  data,
  colorSelection,
  sizeSelection,
  setSizeSelection,
  setSelectedVariant,
}: {
  data: Product;
  colorSelection: string | null;
  sizeSelection: string | null;
  setSizeSelection: (size: string) => void;
  setSelectedVariant: (variant: any) => void;
}) => {
  const hasColors =
    data.variants?.some((v) => Boolean(v.color && v.color.trim() !== "")) ??
    false;
  const filteredVariants = hasColors
    ? data.variants?.filter((v) => v.color === colorSelection) || []
    : data.variants || [];

  const sizes = Array.from(new Set(filteredVariants.map((v) => v.size)));

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizes.length === 0 ? (
          <p className="text-sm text-gray-500">Select a color first</p>
        ) : (
          sizes.map((size, index) => (
            <Button
              key={index}
              type="button"
              title={size}
              className={cn([
                "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base m-1 lg:m-0 max-h-[46px] text-black hover:text-white cursor-pointer capitalize",
                sizeSelection === size &&
                  "bg-deep-green font-medium text-white",
              ])}
              onClick={() => {
                setSizeSelection(size);
                const variant = filteredVariants.find((v) => v.size === size);
                setSelectedVariant(variant || null);
              }}
            >
              {size}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default SizeSelection;
