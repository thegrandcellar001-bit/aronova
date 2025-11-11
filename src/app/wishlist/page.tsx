"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./partials/wishlist-product";
import BreadcrumbWishlist from "./partials/wishlist-breadcrumb";
import ApiLoader from "@/components/common/api-loader";
import { useWishlist } from "../providers/wishlist-provider";

export default function CartPage() {
  const { wishlist, loading, refreshWishlist } = useWishlist();

  return (
    <main className="py-26 bg-white">
      {loading.global ? (
        <ApiLoader message="Loading your wishlist..." />
      ) : (
        <div className="w-full md:max-w-frame mx-auto px-4 xl:px-0">
          {wishlist && wishlist.length > 0 ? (
            <>
              <BreadcrumbWishlist />
              <h2 className="font-bold text-[28px] md:text-4xl mb-1">
                Your wishlist
              </h2>
              <p className="text-black/60 mb-5">
                You have {wishlist.length} item
                {wishlist.length > 1 ? "s" : ""} in your wishlist.
              </p>

              <section className="w-full md:max-w-frame mt-8">
                <motion.div
                  initial={{ y: "100px", opacity: 0 }}
                  whileInView={{ y: "0", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                      <div
                        key={product.product_id}
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
            <div className="flex items-center flex-col gap-4 mt-32 text-gray-400">
              <i className="fal fa-box text-6xl" />
              <span className="block mb-2">
                You have no items in your wishlist yet.
              </span>
              <Button className="rounded-full" asChild>
                <Link href="/shop">Shop</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
