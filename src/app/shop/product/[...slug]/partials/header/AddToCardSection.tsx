"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      <AddToCartBtn data={{ ...data, quantity }} />
      <button
        type="button"
        className="ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] px-4 sm:px-6 text-sm sm:text-base border border-black/10 hover:bg-black hover:text-white transition-all"
        onClick={() => window.location.assign('/concierge')}
      >
        Speak to a Concierge
      </button>
    </div>
  );
};

export default AddToCardSection;
