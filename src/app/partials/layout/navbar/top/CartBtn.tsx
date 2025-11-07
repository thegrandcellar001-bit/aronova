"use client";

import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/providers/cart-provider";

const CartBtn = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative p-1">
      {totalItems === 0 ? (
        <i className="far fa-shopping-cart text-2xl"></i>
      ) : (
        <i className="fas fa-shopping-cart text-2xl text-primary"></i>
      )}
      {totalItems > 0 && (
        <Badge className="flex items-center justify-center bg-black text-white text-xs absolute right-2 top-0 translate-x-1/2 -translate-y-1/2 rounded-full h-5 w-5">
          {totalItems}
        </Badge>
      )}
    </Link>
  );
};

export default CartBtn;
