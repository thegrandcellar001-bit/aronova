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
        <div className="flex items-start gap-4">
          <Link
            href={`/item/${item.product_id}}`}
            className="flex-shrink-0 bg-gray-50 rounded-lg w-20 h-20 overflow-hidden group"
          >
            <Image
              src={item.product.primary_image}
              width={80}
              height={80}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
              alt={item.name}
              priority
            />
          </Link>

          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Link
                  href={`/item/${item.product_id}}`}
                  className="font-semibold text-gray-900 text-sm hover:text-primary transition-colors line-clamp-2 block"
                >
                  {item.name}
                </Link>

                {variant && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {variant.color && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        <i className="fas fa-palette text-gray-500 text-[10px]"></i>
                        {variant.color}
                      </span>
                    )}
                    {variant.size && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        <i className="fas fa-ruler text-gray-500 text-[10px]"></i>
                        {variant.size}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 flex-shrink-0"
                onClick={() => removeItem(item.id)}
              >
                <i className="far fa-trash-alt text-sm text-red-600 cursor-pointer" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-gray-900 text-base font-bold">
                  ₦
                  {(item.product.final_price * item.quantity).toLocaleString(
                    "en-NG"
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  (Qty: {item.quantity})
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
