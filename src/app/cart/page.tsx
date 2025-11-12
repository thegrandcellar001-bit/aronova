"use client";

import BreadcrumbCart from "./partials/cart-breadcrumb";
import ProductCard from "./partials/cart-product";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { FaArrowRight } from "react-icons/fa6";
import { TbBasketExclamation } from "react-icons/tb";
import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ApiLoader from "@/components/common/api-loader";
import { useCart } from "../providers/cart-provider";
import { CartItem } from "@/types/cart.types";

export default function CartPage() {
  const router = useRouter();
  const { toastError } = useToast();
  const { state, loading, reloadCart } = useCart();

  useEffect(() => {
    reloadCart();
  }, []);

  return (
    <main className="py-26 bg-white">
      {loading ? (
        <ApiLoader message="Loading your cart..." />
      ) : (
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {state.items.length > 0 ? (
            <Fragment>
              <BreadcrumbCart />
              <h2 className="font-bold text-[28px] md:text-4xl mb-1">
                Your cart
              </h2>
              <p className="text-black/60 mb-5">
                You have {state.items.length} item
                {state.items.length > 1 ? "s" : ""} in your cart.
              </p>

              <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
                <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                  {state.items.map((item: CartItem, index: number) => (
                    <Fragment key={index}>
                      <ProductCard
                        item={item}
                        variant={item.variant}
                        category_slug={item.product.category_slug}
                        userId={state.user_id}
                      />
                      {state.items.length - 1 !== index && (
                        <hr className="border-t-black/10" />
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                  <h6 className="text-xl md:text-2xl font-bold text-black">
                    Order Summary
                  </h6>
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                      <span className=" text-black/60">Sub-total</span>
                      <span className="font-bold">
                        ₦
                        {state.items
                          .reduce(
                            (acc: number, item: CartItem) =>
                              acc +
                              (item.variant?.final_price ||
                                item.product.pricing.final_price) *
                                item.quantity,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Discount (
                      {"-" + (itemsDiscountPercentage?.toLocaleString() ?? "0")}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -$
                      {itemsDiscountPrice?.toLocaleString()}
                    </span>
                  </div> */}
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Delivery Fee</span>
                      <span className="font-bold">Free</span>
                    </div>
                    <hr className="border-t-black/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-black">Total</span>
                      <span className="font-bold">
                        ₦
                        {state.items
                          .reduce(
                            (acc: number, item: CartItem) =>
                              acc +
                              (item.variant?.final_price ||
                                item.product.pricing.final_price) *
                                item.quantity,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <InputGroup className="bg-[#F0F0F0] rounded-none focus-within:shadow-none">
                      <InputGroup.Text>
                        <i className="far fa-tag text-black/40 text-xl" />
                      </InputGroup.Text>
                      <InputGroup.Input
                        type="text"
                        name="code"
                        placeholder="Add promo code"
                        className="bg-transparent rounded-none placeholder:text-black/40"
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-white w-full max-w-[119px] h-12 cursor-pointer"
                    >
                      Apply
                    </Button>
                  </div>
                  <Button
                    onClick={() => router.push("/checkout")}
                    variant="default"
                    className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                  >
                    Checkout{" "}
                    <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px]"
                    asChild
                  >
                    <Link href="/shop">Continue Browsing →</Link>
                  </Button>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="flex items-center flex-col gap-y-6 text-gray-500 mt-32">
              <i className="fal fa-shopping-cart text-6xl" />
              <span className="block mb-4">No items in your cart yet.</span>
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
