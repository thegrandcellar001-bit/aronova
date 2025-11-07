"use client";

import { useCart } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProductStore } from "@/lib/stores/product";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({
  item,
  quantity,
}: {
  item: Product;
  quantity: number;
}) => {
  const { sizeSelection, colorSelection } = useProductStore();
  const { addItem, addLoading } = useCart();

  return (
    <Button
      type="button"
      variant="default"
      className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
      onClick={() =>
        addItem(item, quantity, item.variants && item.variants[0].id)
      }
      disabled={addLoading}
    >
      {addLoading ? <Spinner className="w-6 h-6 mx-auto" /> : "Add to cart"}
    </Button>
  );
};

export default AddToCartBtn;
