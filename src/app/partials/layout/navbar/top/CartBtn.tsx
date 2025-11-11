"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "@/app/providers/cart-provider";

const CartBtn = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative p-1">
      <i className="far fa-shopping-cart text-2xl text-primary"></i>
      {totalItems > 0 && (
        <span className="absolute top-[-7px] -right-0.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-primary rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
