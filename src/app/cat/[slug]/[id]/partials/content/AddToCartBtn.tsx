"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth";
import { useCartStore } from "@/lib/stores/cart";
import { useProductStore } from "@/lib/stores/product";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const { sizeSelection, colorSelection } = useProductStore();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  return (
    <Button
      type="button"
      variant="default"
      className="w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
      onClick={() => addToCart({ product: data }, user.id)}
    >
      Add to cart
    </Button>
  );
};

export default AddToCartBtn;
