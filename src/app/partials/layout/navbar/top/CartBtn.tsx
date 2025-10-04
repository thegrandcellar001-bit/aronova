"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

const CartBtn = () => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link href="/cart" className="relative p-1">
      {cart?.totalQuantities === 0 ? (
        <i className="far fa-shopping-cart text-2xl"></i>
      ) : (
        <i className="fas fa-shopping-cart text-2xl text-secondary"></i>
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
