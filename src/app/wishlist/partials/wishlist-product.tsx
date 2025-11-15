"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { WishlistItem } from "@/types/wishlist.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/providers/cart-provider";
import { useWishlist } from "@/app/providers/wishlist-provider";
import ApiLoader from "@/components/common/api-loader";

type ProductCardProps = {
  data: WishlistItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const { addItem, removeItem } = useCart();
  const { removeItem: removeItemFromWishlist, loading } = useWishlist();

  if (loading.add || loading.remove)
    return <ApiLoader message="Processing..." />;

  return (
    <div className="flex flex-col space-y-2.5 xl:space-y-4">
      <Link
        href={`/cat/${data.category_slug}/${data.product_id}`}
        className="flex flex-col items-start aspect-auto"
      >
        <div className="bg-[#F0EEED] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
          <Image
            src={data.primary_image}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.name}
            priority
          />
          <Button
            className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-black/10 p-2 z-10"
            size="icon"
            variant={"ghost"}
            title="Remove from wishlist"
            onClick={(e) => {
              e.preventDefault();
              removeItemFromWishlist(data.product_id);
            }}
          >
            <i className="far fa-times text-lg"></i>
          </Button>
        </div>
        <strong className="text-black xl:text-xl">{data.name}</strong>
        <div className="flex items-center space-x-[5px] xl:space-x-2.5">
          <span className="text-black text-xl xl:text-2xl">
            ₦{data.total_price}
          </span>
        </div>
      </Link>
      {/* <Button
        className="cursor-pointer h-14 text-lg"
        size="lg"
        onClick={() => addItem(data, 1, data.variants[0].id)}
      >
        Add to cart
      </Button> */}
    </div>
  );
};

export default ProductCard;
