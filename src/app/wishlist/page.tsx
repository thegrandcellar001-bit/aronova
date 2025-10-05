"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product.types";
import ProductCard from "./partials/wishlist-product";
import BreadcrumbWishlist from "./partials/wishlist-breadcrumb";

export default function CartPage() {
  const wishlistData: Product[] = [
    {
      id: 5,
      title: "Vertical Striped Shirt",
      srcUrl: "/images/pic5.png",
      gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
      price: 232,
      discount: {
        amount: 0,
        percentage: 20,
      },
      rating: 5.0,
    },
    {
      id: 6,
      title: "Courage Graphic T-shirt",
      srcUrl: "/images/pic6.png",
      gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
      price: 145,
      discount: {
        amount: 0,
        percentage: 0,
      },
      rating: 4.0,
    },
    {
      id: 7,
      title: "Loose Fit Bermuda Shorts",
      srcUrl: "/images/pic7.png",
      gallery: ["/images/pic7.png"],
      price: 80,
      discount: {
        amount: 0,
        percentage: 0,
      },
      rating: 3.0,
    },
    {
      id: 8,
      title: "Faded Skinny Jeans",
      srcUrl: "/images/pic8.png",
      gallery: ["/images/pic8.png"],
      price: 210,
      discount: {
        amount: 0,
        percentage: 0,
      },
      rating: 4.5,
    },
    {
      id: 9,
      title: "Polo with Tipping Details",
      srcUrl: "/images/pic14.png",
      gallery: ["/images/pic14.png"],
      price: 180,
      discount: {
        amount: 0,
        percentage: 0,
      },
      rating: 4.5,
    },
    {
      id: 10,
      title: "Black Striped T-shirt",
      srcUrl: "/images/pic15.png",
      gallery: ["/images/pic15.png"],
      price: 150,
      discount: {
        amount: 0,
        percentage: 30,
      },
      rating: 5.0,
    },
  ];

  return (
    <main className="pb-20">
      <div className="w-full md:max-w-frame mx-auto px-4 xl:px-0">
        {wishlistData && wishlistData.length > 0 ? (
          <>
            <BreadcrumbWishlist />
            <div className="text-center mb-10">
              <h2
                className={cn([
                  integralCF.className,
                  "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-2",
                ])}
              >
                Your Wishlist
              </h2>
              <p className="text-lg">
                You have <strong>{wishlistData.length}</strong> item
                {wishlistData.length > 1 ? "s" : ""} in your wishlist.
              </p>
            </div>

            <section className="w-full md:max-w-frame">
              <motion.div
                initial={{ y: "100px", opacity: 0 }}
                whileInView={{ y: "0", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistData.map((product) => (
                    <div
                      key={product.id}
                      className="w-full sm:max-w-[295px] pl-0"
                    >
                      <ProductCard data={product} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">
              You have no items in your wishlist yet.
            </span>
            <Button className="rounded-full" asChild>
              <Link href="/discover">Discover</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
