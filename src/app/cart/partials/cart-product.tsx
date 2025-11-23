"use client";

import React, { Fragment, use } from "react";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "@/components/ui/button";
import { CartItem, CartVariant } from "@/types/cart.types";
import { useCart } from "@/app/providers/cart-provider";

type CartProductProps = {
  item: CartItem;
  variant?: CartVariant;
  userId: number;
};

const CartProduct = ({ item, variant }: CartProductProps) => {
  const { increaseQuantity, decreaseQuantity, removeItem, updateLoading } =
    useCart();
  const imageUrl = item.product.primary_image;
  const price = item.product.final_price;
  const totalPrice = (price * item.quantity).toFixed(2);

  return (
    <div className="flex items-start gap-5">
      <Link
        href={`/item/${item.product_id}`}
        className="flex-shrink-0 bg-gray-50 rounded-lg w-28 h-28 overflow-hidden group"
      >
        <Image
          src={imageUrl}
          width={112}
          height={112}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          alt={item.name}
          priority
        />
      </Link>

      <div className="flex w-full flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link
              href={`/item/${item.product_id}`}
              className="font-semibold text-gray-900 text-base xl:text-lg hover:text-primary transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            {variant && (
              <div className="flex flex-wrap gap-2 mt-2">
                {variant.color && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                    <i className="fas fa-palette text-gray-500"></i>
                    {variant.color}
                  </span>
                )}
                {variant.size && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                    <i className="fas fa-ruler text-gray-500"></i>
                    {variant.size}
                  </span>
                )}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-red-50 flex-shrink-0"
            onClick={() => removeItem(item.id)}
          >
            <i className="far fa-trash-alt text-lg text-red-600 cursor-pointer" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-900 text-xl xl:text-2xl font-bold">
              ₦{Number(totalPrice).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              ₦{price.toLocaleString()} each
            </span>
          </div>

          <CartCounter
            initialValue={item.quantity}
            onAdd={async (value) => {
              await increaseQuantity(item.id);
            }}
            onRemove={async (value) => {
              await decreaseQuantity(item.id);
            }}
            limit={
              item.variant ? item.variant?.available : item.inventory?.available
            }
            loading={updateLoading}
            className="px-4 py-2 h-10 min-w-[120px] max-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
