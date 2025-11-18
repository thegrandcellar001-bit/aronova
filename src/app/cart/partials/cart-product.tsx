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
  category_slug: string;
  userId: number;
};

const CartProduct = ({ item, variant, category_slug }: CartProductProps) => {
  const { increaseQuantity, decreaseQuantity, removeItem, updateLoading } =
    useCart();
  const imageUrl = item.product.primary_image;
  const price = item.product.final_price;
  const totalPrice = (price * item.quantity).toFixed(2);

  return (
    <div className="flex items-start space-x-4">
      <Link
        href={`/shop/product/${item.product_id}`}
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
                {variant.color && (
                  <p className="text-black text-sm capitalize">
                    Color: <span>{variant?.color}</span>
                  </p>
                )}
                {variant.size && (
                  <p className="text-black text-sm capitalize">
                    Size: <span>{variant?.size}</span>
                  </p>
                )}
              </Fragment>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            onClick={() => removeItem(item.id)}
          >
            <i className="far fa-trash text-lg text-red-600 cursor-pointer" />
          </Button>
        </div>

        <div className="flex items-center flex-wrap justify-between mt-2">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            <span className="text-black text-xl xl:text-2xl">
              ₦{Number(totalPrice).toLocaleString()}
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
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
