"use client";

import { Button } from "@/components/ui/button";
import { useProductStore } from "@/lib/stores/product";
import { cn } from "@/lib/utils";
import React from "react";

const SizeSelection = () => {
  const { sizeSelection, setSizeSelection } = useProductStore();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {["S", "M", "L", "XL", "XXL"].map((size, index) => (
          <Button
            key={index}
            type="button"
            variant="default"
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base m-1 lg:m-0 max-h-[46px] text-black hover:text-white cursor-pointer",
              sizeSelection === size && "bg-deep-green font-medium text-white",
            ])}
            onClick={() => setSizeSelection(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
