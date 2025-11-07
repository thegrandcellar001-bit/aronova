"use client";

import BreadcrumbCart from "./partials/checkout-breadcrumb";
import ProductCard from "./partials/checkout-product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaArrowLeft } from "react-icons/fa";
import api from "@/lib/axios";
import { lgaList } from "@/components/common/location-selector";
import { useAuthStore } from "@/lib/stores/auth";
import { splitName } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "../providers/cart-provider";
import { CartItem } from "@/types/cart.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { address } from "framer-motion/client";
import { Spinner } from "@/components/ui/spinner";

export default function CartPage() {
  const { user } = useAuthStore();
  const { state, loading } = useCart();

  const [submitLoading, setSubmitLoading] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("card");
  const [saveAddress, setSaveAddress] = useState(false);

  const [deliveryFormData, setDeliveryFormData] = useState({
    firstName: splitName(user.name).firstName || "",
    lastName: splitName(user.name).lastName || "",
    address: "",
    city: "",
    state: "",
    phone: "",
    additionalPhone: "",
  });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleStateChange = (e: string) => {
    const state = e;
    setDeliveryFormData((prevData) => ({
      ...prevData,
      state: state,
    }));
  };

  const handleLGAChange = (e: string) => {
    const lga = e;
    setDeliveryFormData((prevData) => ({
      ...prevData,
      city: lga,
    }));
  };

  const handleSubmitDeliveryAddress = async () => {
    setSubmitLoading(true);

    try {
      const res = await api.post("/customer/addresses", {
        state: deliveryFormData.state,
        lga: deliveryFormData.city,
        address: deliveryFormData.address,
        delivery_address: deliveryFormData.address,
        shipping_address: deliveryFormData.address,
        phone_number: deliveryFormData.phone,
        additional_phone_number: deliveryFormData.additionalPhone,
        additional_info: "N/A",
        is_default: true,
      });
      toastSuccess("Delivery address saved successfully.");
      setStep(2);
    } catch (e) {
      toastError("Failed to save delivery address. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="py-26 bg-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {state && state.items.length > 0 ? (
          <Fragment>
            <BreadcrumbCart />
            <h2 className="font-bold text-[28px] md:text-4xl mb-1">Checkout</h2>
            <p className="text-black/60 mb-5">Checkout your items.</p>

            <div className="flex flex-col lg:flex-row gap-x-4 space-y-5 lg:space-y-0 lg:space-x-5 items-start relative">
              {/* Left Section */}
              <div className="w-full mt-6">
                {step === 1 && (
                  <div>
                    <h6 className="text-xl md:text-2xl font-bold text-black">
                      1. Delivery Details
                    </h6>
                    <div className="flex flex-col space-y-4 mt-6">
                      <div className="flex items-center gap-x-4">
                        <Input
                          type="text"
                          placeholder="First Name"
                          className="h-12 bg-white"
                          value={deliveryFormData.firstName}
                          readOnly
                        />
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className="h-12 bg-white"
                          value={deliveryFormData.lastName}
                          readOnly
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="Delivery Address"
                        className="h-12 bg-white"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            address: e.target.value,
                          })
                        }
                        value={deliveryFormData.address}
                        required
                      />
                      <div className="flex items-center gap-x-4">
                        <Select
                          autoComplete="off"
                          defaultValue={deliveryFormData.state}
                          onValueChange={(e) => handleStateChange(e)}
                        >
                          <SelectTrigger className="w-full h-12 bg-white">
                            <SelectValue placeholder="- Select state -" />
                          </SelectTrigger>
                          <SelectContent id="state">
                            <SelectGroup>
                              {Object.keys(lgaList).map((state, index) => (
                                <SelectItem value={state} key={index}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <Select
                          autoComplete="off"
                          defaultValue={deliveryFormData.city}
                          onValueChange={(e) => handleLGAChange(e)}
                          disabled={deliveryFormData.state === ""}
                        >
                          <SelectTrigger className="w-full h-12 bg-white">
                            <SelectValue placeholder="- Select city -" />
                          </SelectTrigger>
                          <SelectContent id="lga">
                            <SelectGroup>
                              {lgaList[deliveryFormData.state]?.map(
                                (lga, index) => (
                                  <SelectItem value={lga} key={index}>
                                    {lga}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        type="tel"
                        placeholder="Phone"
                        className="h-12 bg-white"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            phone: e.target.value,
                          })
                        }
                        value={deliveryFormData.phone}
                        required
                      />

                      <Input
                        type="tel"
                        placeholder="Additional phone number"
                        className="h-12 bg-white"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            additionalPhone: e.target.value,
                          })
                        }
                        value={deliveryFormData.additionalPhone}
                        required
                      />

                      <p className="text-sm">
                        <i className="far fa-info-circle mr-1" /> This
                        information will be saved for faster check-out next
                        time.
                      </p>

                      <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
                          asChild
                        >
                          <Link href="/cart">
                            <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                            Back to cart
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                          onClick={handleSubmitDeliveryAddress}
                          disabled={
                            deliveryFormData.firstName === "" ||
                            deliveryFormData.lastName === "" ||
                            deliveryFormData.address === "" ||
                            deliveryFormData.city === "" ||
                            deliveryFormData.state === "" ||
                            deliveryFormData.phone === "" ||
                            submitLoading
                          }
                        >
                          {submitLoading ? (
                            <Spinner className="w-8 h-8 mx-auto" />
                          ) : (
                            <Fragment>
                              Next{" "}
                              <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                            </Fragment>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h6 className="text-xl md:text-2xl font-bold text-black">
                      2. Payment Method
                    </h6>
                    <div className="flex flex-col space-y-4 mt-6">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        Choose a payment method
                      </h3>

                      <RadioGroup
                        value={selectedPaymentMethod}
                        onValueChange={handlePaymentMethodChange}
                        className="flex flex-col space-y-4 mt-6"
                      >
                        <Label
                          htmlFor="method1"
                          className="flex items-center gap-4 rounded-lg border-2 p-3 has-[data-state=checked]:border-primary h-20"
                        >
                          <RadioGroupItem
                            value="card"
                            id="method1"
                            className="h-[23px] w-[23px]"
                          />
                          <div className="flex items-center justify-between font-normal w-full">
                            <div className="flex flex-col gap-1.5">
                              <p className="leading-none font-medium">
                                Credit or debit card
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Prepay with your credit or debit card. We accept
                                all major cards (VISA, MasterCard & Verve).
                              </p>
                            </div>
                            <Image
                              src="/icons/payment.png"
                              alt="Payment Methods"
                              width={328}
                              height={100}
                              className="w-[50px] h-[100px] object-contain"
                            />
                          </div>
                        </Label>

                        <Label
                          htmlFor="method2"
                          className="flex items-center gap-4 rounded-lg border-2 p-3 has-[data-state=checked]:border-primary h-20"
                        >
                          <RadioGroupItem
                            value="delivery"
                            id="method2"
                            className="h-[23px] w-[23px]"
                          />
                          <div className="flex items-center justify-between font-normal w-full">
                            <div className="flex flex-col gap-1.5">
                              <p className="leading-none font-medium">
                                Pay On Delivery
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Go cashless, you can pay by cash or via bank
                                transfer on delivery.
                              </p>
                            </div>
                            <i className="far fa-dollar-sign text-2xl"></i>
                          </div>
                        </Label>
                      </RadioGroup>

                      <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm md:text-base font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
                          onClick={prevStep}
                        >
                          <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="text-sm md:text-base text-white font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                          onClick={nextStep}
                        >
                          Next{" "}
                          <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h6 className="text-xl md:text-2xl font-bold text-black">
                      3. Confirm Order
                    </h6>

                    <div className="text-md mt-4">
                      You have chosen to pay with{" "}
                      {selectedPaymentMethod === "card" ? (
                        <span className="font-medium">
                          Credit or debit card
                        </span>
                      ) : (
                        <span className="font-medium">Pay On Delivery</span>
                      )}
                      . Please confirm your delivery address and payment method
                      before placing your order.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex flex-col gap-3 rounded-md border-2 border-primary p-4">
                        <div>
                          <p className="text-md font-medium">
                            <i className="far fa-map text-md"></i> Delivery
                            Address
                          </p>
                          <p className="text-sm text-black mt-2">
                            {`${deliveryFormData.firstName} ${deliveryFormData.lastName}`}
                          </p>
                          <p className="text-sm text-black">
                            {`${deliveryFormData.address}, ${deliveryFormData.city}, ${deliveryFormData.state}`}
                          </p>
                          <p className="text-sm text-black">
                            {deliveryFormData.phone}
                          </p>
                        </div>
                        <div
                          className="flex items-center gap-2 text-secondary font-medium cursor-pointer"
                          onClick={() => setStep(1)}
                        >
                          <i className="far fa-edit text-md"></i>
                          <span className="text-sm">Change Address</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 rounded-md border-2 border-primary p-4">
                        <div>
                          <p className="text-md font-medium">
                            <i className="far fa-credit-card text-md"></i>{" "}
                            Payment Method
                          </p>
                          {selectedPaymentMethod === "card" ? (
                            <div className="mt-2">
                              <p className="text-sm text-black font-medium">
                                Credit or debit card
                              </p>
                              <p className="text-sm text-black/60">
                                You'll be redirected to your payment gateway to
                                complete your purchase.
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <p className="text-sm text-black font-medium">
                                Pay On Delivery
                              </p>
                              <p className="text-sm text-black/60">
                                You can pay by cash or via bank transfer on
                                delivery.
                              </p>
                            </div>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-2 text-secondary font-medium cursor-pointer"
                          onClick={() => setStep(2)}
                        >
                          <i className="far fa-edit text-md"></i>
                          <span className="text-sm">Change payment method</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-md mt-4">
                      By clicking confirm order you confirm that you have read,
                      understood and accepted the{" "}
                      <Link
                        href="/terms"
                        className="font-medium hover:underline hover:underline-offset-2"
                      >
                        Order and Delivery T&Cs
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="font-medium hover:underline hover:underline-offset-2"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/returns"
                        className="font-medium hover:underline hover:underline-offset-2"
                      >
                        Returns Policy
                      </Link>
                      .
                    </div>

                    <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-sm md:text-base font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
                        onClick={prevStep}
                      >
                        <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="text-sm md:text-base text-white font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                      >
                        Confirm order{" "}
                        <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                      </Button>
                    </div>
                  </div>
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
                        Your items ({state?.items.length} items ~ $
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
                          {state?.items.map((item: CartItem, index: number) => (
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
                          ))}
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
                      $
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
      </div>
    </main>
  );
}
