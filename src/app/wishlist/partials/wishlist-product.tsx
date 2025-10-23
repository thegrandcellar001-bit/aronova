"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const { toastSuccess, toastError } = useToast();

  const handleRemove = async (productId: string) => {
    const res = await api.delete(`/cart/items/${productId}`);
    if (res.status !== 200) {
      toastError("Failed to remove product from wishlist");
      return;
    }
    toastSuccess(`Remove product from wishlist`);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const res = await api.post("/cart/items", {
        product_id: product.id,
        quantity: 1,
        variant_id: product.variants[0].id,
      });

      if (res.status !== 200) {
        toastError("Failed to add product to cart");
        return;
      }

      toastSuccess("Added to cart");
    } catch (error) {
      toastError("Failed to add product to cart");
      return;
    }
  };

  return (
    // <div className="flex flex-col space-y-2.5 xl:space-y-4">
    //   <Link
    //     href={`/shop/product/${data.id}}`}
    //     className="flex flex-col items-start aspect-auto"
    //   >
    //     <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
    //       <Image
    //         src={data.media[0].url}
    //         width={295}
    //         height={298}
    //         className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
    //         alt={data.name}
    //         priority
    //       />
    //       <Button
    //         className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-black/10 p-2 z-10"
    //         size="icon"
    //         variant={"ghost"}
    //         title="Remove from wishlist"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           handleRemove(data.id);
    //         }}
    //       >
    //         <i className="far fa-times text-lg"></i>
    //       </Button>
    //     </div>
    //     <strong className="text-black xl:text-xl">{data.name}</strong>
    //     <div className="flex items-center space-x-[5px] xl:space-x-2.5">
    //       <span className="font-bold text-black text-xl xl:text-2xl">
    //         ${data.base_price}
    //       </span>
    //     </div>
    //   </Link>
    //   <Button
    //     className="cursor-pointer h-14 text-lg"
    //     size="lg"
    //     onClick={() => handleAddToCart(data)}
    //   >
    //     Add to cart
    //   </Button>
    // </div>
    <div>Wishlist product</div>
  );
};

export default ProductCard;
