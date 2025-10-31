"use client";

import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart";

const CartBtn = () => {
  const { cart } = useCartStore();

  return (
    <Link href="/cart" className="relative p-1">
      {cart?.totalQuantities === 0 ? (
        <i className="far fa-shopping-cart text-2xl"></i>
      ) : (
        <i className="fas fa-shopping-cart text-2xl text-primary"></i>
      )}
      {cart && cart.totalQuantities > 0 && (
        <Badge className="flex items-center justify-center bg-black text-white text-xs absolute right-2 top-0 translate-x-1/2 -translate-y-1/2 rounded-full h-5 w-5">
          {cart.totalQuantities}
        </Badge>
      )}
    </Link>
  );
};

export default CartBtn;
