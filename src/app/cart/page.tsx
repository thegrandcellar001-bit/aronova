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
              <div className="mb-8">
                <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
                  Shopping Cart
                </h2>
                <p className="text-gray-600">
                  {state.items.length}{" "}
                  {state.items.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-full bg-white border p-6 space-y-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Cart Items
                    </h3>
                    <span className="text-sm text-gray-500">
                      {state.items.length}{" "}
                      {state.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  {state.items.map((item: CartItem, index: number) => (
                    <Fragment key={index}>
                      <ProductCard
                        item={item}
                        variant={item.variant}
                        userId={state.user_id}
                      />
                      {state.items.length - 1 !== index && (
                        <hr className="border-gray-200" />
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="w-full lg:max-w-[420px] bg-white border p-6 space-y-6 sticky top-24 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-receipt text-primary"></i>
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900">
                      Order Summary
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
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

                    <div className="flex items-center justify-between py-3 border-t border-gray-200">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-sm text-gray-500">
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-2 border-gray-300">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-primary">
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

                  <Button
                    onClick={() => router.push("/checkout")}
                    variant="default"
                    className="text-base font-semibold w-full py-6 h-auto group cursor-pointer"
                  >
                    Proceed to Checkout
                    <FaArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="text-base font-medium w-full py-6 h-auto hover:bg-gray-50"
                    asChild
                  >
                    <Link href="/shop">
                      <i className="far fa-arrow-left mr-2"></i>
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="flex items-center flex-col gap-y-6 text-center mt-32 mb-20">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 mb-4">
                <i className="fal fa-shopping-cart text-6xl text-gray-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Cart is Empty
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Looks like you haven't added anything to your cart yet. Start
                  shopping to fill it up!
                </p>
              </div>
              <Button size="lg" className="font-semibold px-8" asChild>
                <Link href="/shop">
                  <i className="far fa-shopping-bag mr-2"></i>
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
