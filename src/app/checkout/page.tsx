"use client";

import BreadcrumbCart from "./partials/checkout-breadcrumb";
import ProductCard from "./partials/checkout-product";
import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from "@/lib/stores/auth";
import { useCart } from "../providers/cart-provider";
import { CartItem } from "@/types/cart.types";
import { useUserData } from "../providers/user-provider";
import ApiLoader from "@/components/common/api-loader";
import StepOne from "./partials/steps/step-one";
import StepTwo from "./partials/steps/step-two";
import StepThree from "./partials/steps/step-three";

export default function Page() {
  const { user } = useAuthStore();
  const { state, loading: cartLoading } = useCart();
  const { loading: userLoading, userAddresses } = useUserData();

  const [deliveryFormData, setDeliveryFormData] = useState({
    address: "",
    city: "",
    state: "",
    phone: "",
    additionalPhone: "",
  });

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <main className="py-26 bg-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cartLoading && userLoading.getAddress ? (
          <ApiLoader message="Loading your cart for checkout..." />
        ) : (
          <Fragment>
            {state && state.items.length > 0 ? (
              <Fragment>
                <BreadcrumbCart />
                <h2 className="font-bold text-[28px] md:text-4xl mb-1">
                  Checkout
                </h2>
                <p className="text-black/60 mb-5">Checkout your items.</p>
                <div className="flex flex-col lg:flex-row gap-x-4 space-y-5 lg:space-y-0 lg:space-x-5 items-start relative">
                  {/* Left Section */}
                  <div className="w-full mt-6">
                    {step === 1 && (
                      <StepOne
                        user={user}
                        setStep={setStep}
                        deliveryFormData={deliveryFormData}
                        setDeliveryFormData={setDeliveryFormData}
                      />
                    )}

                    {step === 2 && (
                      <StepTwo prevStep={prevStep} nextStep={nextStep} />
                    )}

                    {step === 3 && (
                      <StepThree
                        userAddresses={userAddresses}
                        deliveryFormData={deliveryFormData}
                        setStep={setStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                      />
                    )}
                  </div>

                  {/* Right Section */}
                  <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 border border-black/10 sticky top-[100px]">
                    <h6 className="text-xl md:text-2xl font-bold text-black">
                      Order Summary
                    </h6>
                    <div className="flex flex-col space-y-5">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="items">
                          <AccordionTrigger
                            className="text-black/60 cursor-pointer"
                            style={{ textDecoration: "none" }}
                          >
                            Your items ({state?.items.length} items ~ ₦
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
                            )
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                              {state?.items.map(
                                (item: CartItem, index: number) => (
                                  <Fragment key={index}>
                                    <ProductCard
                                      item={item}
                                      variant={item.variant}
                                      category_slug={item.product.category_slug}
                                    />
                                    {state.items.length - 1 !== index && (
                                      <hr className="border-t-black/10" />
                                    )}
                                  </Fragment>
                                )
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

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
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="flex items-center flex-col gap-y-4 text-gray-300 mt-32">
                <i className="fal fa-shopping-cart text-5xl" />
                <span className="block">
                  You have no items in your cart to checkout yet.
                </span>
                <Button className="rounded-full" asChild>
                  <Link href="/shop">Shop</Link>
                </Button>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </main>
  );
}
