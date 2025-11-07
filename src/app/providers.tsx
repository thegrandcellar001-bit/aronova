"use client";

import React from "react";
import { CartProvider } from "./providers/cart-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
