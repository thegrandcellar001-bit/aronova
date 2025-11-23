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
import StepFour from "./partials/steps/step-four";
import { UserAddress } from "@/types/account/user";
import { useApi } from "@/hooks/use-api";

export default function Page() {
  const { user } = useAuthStore();
  const { state, loading: cartLoading } = useCart();
  const { loading: userLoading, fetchDefaultAddress } = useUserData();
  const [userAddress, setUserAddress] = useState<UserAddress>();

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState("standard");
  const [deliveryPrices, setDeliveryPrices] = useState({
    standard: 0,
    express: 0,
  });

  const [deliveryFormData, setDeliveryFormData] = useState({
    address: "",
    city: "",
    state: "",
    phone: "",
    additionalPhone: "",
  });

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const { execute: fetchSettings } = useApi("/settings");

  const loadUserAddress = async () => {
    const address = await fetchDefaultAddress();
    setUserAddress(address as UserAddress);
  };

  const loadDeliveryPrice = async () => {
    try {
      const data = await fetchSettings();
      setDeliveryPrices({
        standard: parseInt(data.shipping_options.standard),
        express: parseInt(data.shipping_options.express),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserAddress();
    loadDeliveryPrice();
  }, []);

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
                <div className="mb-8">
                  <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
                    Checkout
                  </h2>
                  <p className="text-gray-600">
                    Complete your purchase securely
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-start relative">
                  {/* Left Section */}
                  <div className="w-full">
                    {step === 1 && (
                      <StepOne
                        user={user}
                        setStep={setStep}
                        userAddress={userAddress || null}
                        deliveryFormData={deliveryFormData}
                        setDeliveryFormData={setDeliveryFormData}
                      />
                    )}

                    {step === 2 && (
                      <StepTwo prevStep={prevStep} nextStep={nextStep} />
                    )}

                    {step === 3 && (
                      <StepThree
                        prevStep={prevStep}
                        nextStep={nextStep}
                        setStep={setStep}
                        selectedDeliveryMethod={selectedDeliveryMethod}
                        setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                      />
                    )}

                    {step === 4 && (
                      <StepFour
                        userAddress={userAddress || null}
                        deliveryFormData={deliveryFormData}
                        selectedDeliveryMethod={selectedDeliveryMethod}
                        setStep={setStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                      />
                    )}
                  </div>

                  {/* Right Section */}
                  <div className="w-full lg:max-w-[420px] bg-white border p-6 space-y-6 sticky top-24 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="fas fa-receipt text-primary"></i>
                      </div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        Order Summary
                      </h3>
                    </div>
                    <div className="space-y-5">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="items">
                          <AccordionTrigger
                            className="text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="flex items-center gap-2">
                              <i className="fas fa-shopping-bag text-gray-500"></i>
                              <span>
                                {state?.items.length}{" "}
                                {state?.items.length === 1 ? "item" : "items"} •
                                {state.items
                                  .reduce(
                                    (acc: number, item: CartItem) =>
                                      acc +
                                      (item.variant?.final_price ||
                                        item.product.pricing.final_price) *
                                        item.quantity,
                                    0
                                  )
                                  .toLocaleString("en-NG", {
                                    currency: "NGN",
                                    style: "currency",
                                  })}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="w-full bg-gray-50 p-4 space-y-4 border border-gray-200 rounded-lg mt-2">
                              {state?.items.map(
                                (item: CartItem, index: number) => (
                                  <Fragment key={index}>
                                    <ProductCard
                                      item={item}
                                      variant={item.variant}
                                      category_slug={item.product.category_slug}
                                    />
                                    {state.items.length - 1 !== index && (
                                      <hr className="border-gray-200" />
                                    )}
                                  </Fragment>
                                )
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      {(selectedDeliveryMethod === "standard" ||
                        selectedDeliveryMethod === "express") && (
                        <Fragment>
                          <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600 flex items-center gap-2">
                              <i className="fas fa-shipping-fast text-gray-500"></i>
                              Delivery Method
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                              <i
                                className={`${
                                  selectedDeliveryMethod === "standard"
                                    ? "fas fa-truck"
                                    : "fas fa-truck-fast"
                                }`}
                              ></i>
                              {selectedDeliveryMethod}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="font-semibold text-gray-900">
                              {deliveryPrices[
                                selectedDeliveryMethod as keyof typeof deliveryPrices
                              ].toLocaleString("en-NG", {
                                currency: "NGN",
                                style: "currency",
                              })}
                            </span>
                          </div>
                          <hr className="border-gray-200" />
                        </Fragment>
                      )}

                      <div className="flex items-center justify-between py-4 border-t-2 border-gray-300">
                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {(
                            state.items.reduce(
                              (acc: number, item: CartItem) =>
                                acc +
                                (item.variant?.final_price ||
                                  item.product.pricing.final_price) *
                                  item.quantity,
                              0
                            ) +
                            deliveryPrices[
                              selectedDeliveryMethod as keyof typeof deliveryPrices
                            ]
                          ).toLocaleString("en-NG", {
                            currency: "NGN",
                            style: "currency",
                          })}
                        </span>
                      </div>
                    </div>
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
                    You have no items in your cart to checkout. Start shopping
                    to add items!
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
          </Fragment>
        )}
      </div>
    </main>
  );
}
