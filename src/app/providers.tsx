"use client";

import React from "react";
import { CartProvider } from "./providers/cart-provider";
import { WishlistProvider } from "./providers/wishlist-provider";
import { UserDataProvider } from "./providers/user-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <UserDataProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </UserDataProvider>
  );
};

export default Providers;
