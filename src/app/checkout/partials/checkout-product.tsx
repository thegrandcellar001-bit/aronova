"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart.types";
import { useCart } from "@/app/providers/cart-provider";
import ApiLoader from "@/components/common/api-loader";

type ProductCardProps = {
  item: CartItem;
  variant?: CartItem["variant"];
  category_slug: string;
};

const ProductCard = ({ item, variant, category_slug }: ProductCardProps) => {
  const { removeItem, removeLoading } = useCart();

  return (
    <Fragment>
      {removeLoading ? (
        <ApiLoader message="Removing item..." />
      ) : (
        <div className="flex items-start space-x-4">
          <Link
            href={`/cat/${category_slug}/${item.product_id}}`}
            className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
          >
            <Image
              src={item.product.primary_image}
              width={124}
              height={124}
              className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
              alt={item.name}
              priority
            />
          </Link>

          <div className="flex w-full self-stretch flex-col">
            <div className="flex items-center justify-between">
              <div className="mb-2">
                <Link
                  href={`/cat/${category_slug}/${item.product_id}}`}
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
                onClick={() => removeItem(item.id)}
              >
                <i className="far fa-trash text-lg text-red-600 cursor-pointer" />
              </Button>
            </div>
            <div className="flex items-center flex-wrap justify-between">
              <div className="flex items-center space-x-[5px] xl:space-x-2.5">
                <span className="text-black text-xl xl:text-2xl">
                  ${item.product.final_price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductCard;
