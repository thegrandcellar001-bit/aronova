"use client";

import React from "react";
import { CartProvider } from "./providers/cart-provider";
import { WishlistProvider } from "./providers/wishlist-provider";
import { UserDataProvider } from "./providers/user-provider";
import { ProductProvider } from "./providers/product-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <UserDataProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </UserDataProvider>
  );
};

export default Providers;
