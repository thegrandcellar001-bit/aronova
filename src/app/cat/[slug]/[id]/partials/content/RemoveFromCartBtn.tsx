"use client";

import { useCart } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProductStore } from "@/lib/stores/product";
import React from "react";

const RemoveFromCartBtn = ({ item_id }: { item_id: number }) => {
  const { removeItem, removeLoading } = useCart();

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
      onClick={() => removeItem(item_id)}
      disabled={removeLoading}
    >
      {removeLoading ? (
        <Spinner className="w-6 h-6 mx-auto" />
      ) : (
        "Remove from cart"
      )}
    </Button>
  );
};

export default RemoveFromCartBtn;
