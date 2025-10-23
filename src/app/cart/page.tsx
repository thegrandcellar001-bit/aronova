"use client";

import BreadcrumbCart from "./partials/cart-breadcrumb";
import ProductCard from "./partials/cart-product";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Product, Variant } from "@/types/product.types";
import { useToast } from "@/hooks/use-toast";
import ApiLoader from "@/components/common/api-loader";

export interface CartData {
  id: number;
  user_id: number;
  total: number;
  items: {
    id: number;
    name: string;
    product: Product;
    product_id: string;
    category_slug: string;
    images: string[];
    pricing: {
      base_price: number;
      currency: string;
    };
    subtotal: number;
    quantity: number;
    variant_id: string;
    variant: Variant;
  }[];
  created_at: string;
  updated_at: string;
  status: string;
}

export default function CartPage() {
  const router = useRouter();
  const { toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [cart, setCartData] = useState<CartData>();

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      return res.data as CartData;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toastError("An error occurred while fetching cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCartItems();
      setCartData(data as CartData);
    };

    getData();
  }, []);

  return (
    <main className="pb-20">
      {loading ? (
        <ApiLoader message="Loading your cart..." />
      ) : (
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {cart && cart.items.length > 0 ? (
            <>
              <BreadcrumbCart />
              <h2
                className={cn([
                  integralCF.className,
                  "font-bold text-[32px] md:text-[40px] uppercase mb-1",
                ])}
              >
                Your cart
              </h2>
              <p className="text-black/60 mb-5">
                Every piece here is curated and authenticated. We’ve reserved it
                for you.
              </p>
              <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
                <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                  {cart?.items.map((item, idx, arr) => (
                    <React.Fragment key={idx}>
                      <ProductCard
                        item={{
                          id: item.id,
                          product_id: item.product_id,
                          name: item.name,
                          image: item.images[0],
                          price: item.pricing.base_price,
                          quantity: item.quantity,
                        }}
                        category_slug={item.category_slug}
                        userId={cart.user_id}
                        onCartChange={async () => {
                          const data = await fetchCartItems();
                          setCartData(data as CartData);
                        }}
                      />
                      {arr.length - 1 !== idx && (
                        <hr className="border-t-black/10" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                  <h6 className="text-xl md:text-2xl font-bold text-black">
                    Order Summary
                  </h6>
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="md:text-xl text-black/60">
                        Sub-total
                      </span>
                      <span className="md:text-xl font-bold">
                        ${cart?.total.toLocaleString()}
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
                      <span className="md:text-xl text-black/60">
                        Delivery Fee
                      </span>
                      <span className="md:text-xl font-bold">Free</span>
                    </div>
                    <hr className="border-t-black/10" />
                    <div className="flex items-center justify-between">
                      <span className="md:text-xl text-black">Total</span>
                      <span className="text-xl md:text-2xl font-bold">
                        ${Math.round(cart?.total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <InputGroup className="bg-[#F0F0F0]">
                      <InputGroup.Text>
                        <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                      </InputGroup.Text>
                      <InputGroup.Input
                        type="text"
                        name="code"
                        placeholder="Add promo code"
                        className="bg-transparent placeholder:text-black/40"
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-white rounded-full w-full max-w-[119px] h-[48px] cursor-pointer"
                    >
                      Apply
                    </Button>
                  </div>
                  <Button
                    onClick={() => router.push("/checkout")}
                    variant="secondary"
                    className="text-sm md:text-base text-white font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                  >
                    Checkout{" "}
                    <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm md:text-base font-medium rounded-full w-full py-4 h-[54px] md:h-[60px]"
                    asChild
                  >
                    <Link href="/discover">Continue Browsing →</Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center flex-col text-gray-300 mt-32">
              <TbBasketExclamation strokeWidth={1} className="text-6xl" />
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
