"use client";

import React, { Fragment, use } from "react";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { CartItem, CartVariant } from "@/types/cart.types";

type CartProductProps = {
  item: CartItem;
  variant?: CartVariant;
  category_slug: string;
  userId: number;
  onCartChange?: () => void; // optional callback to refetch cart after change
};

const CartProduct = ({
  item,
  variant,
  category_slug,
  userId,
  onCartChange,
}: CartProductProps) => {
  const { toastSuccess, toastError } = useToast();

  const handleRemoveItem = async (itemId: string) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      if (res.status !== 200) throw new Error();
      toastSuccess("Removed product from cart");
      onCartChange?.();
    } catch {
      toastError("Failed to remove product from cart");
    }
  };

  const handleUpdateQuantity = async (itemId: string, delta: number) => {
    try {
      const res = await api.put(`/cart/items/${itemId}`, {
        quantity: delta,
        user_id: userId,
      });
      if (res.status !== 200) throw new Error();
      toastSuccess("Updated cart item quantity");
      onCartChange?.();
    } catch {
      toastError("Failed to update cart item quantity");
    }
  };

  // Main product image (fallback to first media)
  const imageUrl = item.image || "/placeholder.png";

  // Product price logic (including variant adjustment)
  const basePrice = item.price;
  const totalPrice = (basePrice * item.quantity).toFixed(2);

  return (
    <div className="flex items-start space-x-4">
      {/* Product Image */}
      <Link
        href={`/shop/product/${item.id}`}
        className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <Image
          src={imageUrl}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={item.name}
          priority
        />
      </Link>

      {/* Product Details */}
      <div className="flex w-full self-stretch flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/cat/${category_slug}/${item.product_id}`}
              className="text-black text-base xl:text-xl"
            >
              {item.name}
            </Link>

            {variant && (
              <Fragment>
                <p className="text-black text-sm capitalize">
                  Color: <span>{variant?.color}</span>
                </p>
                <p className="text-black text-sm capitalize">
                  Size: <span>{variant?.size}</span>
                </p>
              </Fragment>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            onClick={() => handleRemoveItem(item.product_id)}
          >
            <i className="far fa-trash text-lg text-red-600 cursor-pointer" />
          </Button>
        </div>

        {/* Price + Quantity Counter */}
        <div className="flex items-center flex-wrap justify-between mt-2">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            <span className="text-black text-xl xl:text-2xl">
              ${totalPrice}
            </span>
          </div>

          {/* Quantity Controller */}
          <CartCounter
            initialValue={item.quantity}
            onAdd={async (value) => {
              handleUpdateQuantity(item.product_id, value);
              onCartChange?.();
            }}
            onRemove={async (value) => {
              handleUpdateQuantity(item.product_id, value);
              onCartChange?.();
            }}
            isZeroDelete
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
