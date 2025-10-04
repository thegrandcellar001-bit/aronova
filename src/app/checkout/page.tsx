"use client";

import BreadcrumbCart from "./partials/checkout-breadcrumb";
import ProductCard from "./partials/checkout-product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
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

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    "card"
  );
  const [saveAddress, setSaveAddress] = useState(false);
  const [deliveryFormData, setDeliveryFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <main className="pb-20">
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
              Checkout
            </h2>
            <p className="text-black/60 mb-5">Checkout your items.</p>

            <div className="flex flex-col lg:flex-row gap-x-4 space-y-5 lg:space-y-0 lg:space-x-5 items-start relative">
              <div className="w-full mt-6">
                {step === 1 && (
                  <div>
                    <h6 className="text-xl md:text-2xl font-bold text-black">
                      1. Delivery Details
                    </h6>
                    <div className="flex flex-col space-y-4 mt-6">
                      <div className="flex items-center gap-x-2">
                        <Input
                          type="text"
                          placeholder="First Name"
                          className="h-12"
                          onChange={(e) =>
                            setDeliveryFormData({
                              ...deliveryFormData,
                              firstName: e.target.value,
                            })
                          }
                          value={deliveryFormData.firstName}
                          required
                        />
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className="h-12"
                          onChange={(e) =>
                            setDeliveryFormData({
                              ...deliveryFormData,
                              lastName: e.target.value,
                            })
                          }
                          value={deliveryFormData.lastName}
                          required
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="Delivery Address"
                        className="h-12"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            address: e.target.value,
                          })
                        }
                        value={deliveryFormData.address}
                        required
                      />
                      <Input
                        type="text"
                        placeholder="City"
                        className="h-12"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            city: e.target.value,
                          })
                        }
                        value={deliveryFormData.city}
                        required
                      />
                      <Input
                        type="text"
                        placeholder="State"
                        className="h-12"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            state: e.target.value,
                          })
                        }
                        value={deliveryFormData.state}
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        className="h-12"
                        onChange={(e) =>
                          setDeliveryFormData({
                            ...deliveryFormData,
                            phone: e.target.value,
                          })
                        }
                        value={deliveryFormData.phone}
                        required
                      />

                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="saveAddress"
                          checked={saveAddress}
                          onCheckedChange={(set) =>
                            setSaveAddress(set as boolean)
                          }
                        />
                        <Label htmlFor="saveAddress">
                          Save this information for faster check-out next time
                        </Label>
                      </div>

                      <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm md:text-base font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
                          asChild
                        >
                          <Link href="/discover">
                            <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                            Continue Browsing
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="text-sm md:text-base text-white font-medium rounded-full w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
                          onClick={nextStep}
                          disabled={
                            deliveryFormData.firstName === "" ||
                            deliveryFormData.lastName === "" ||
                            deliveryFormData.address === "" ||
                            deliveryFormData.city === "" ||
                            deliveryFormData.state === "" ||
                            deliveryFormData.phone === ""
                          }
                        >
                          Next{" "}
                          <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
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
                          className="flex items-center gap-4 rounded-lg border-2 p-3 has-[[data-state=checked]]:border-primary h-20"
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
                          className="flex items-center gap-4 rounded-lg border-2 p-3 has-[[data-state=checked]]:border-primary h-20"
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

              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10 sticky top-[100px]">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="items">
                      <AccordionTrigger className="md:text-xl text-black/60">
                        Your items ({cart?.items.length} items ~ ${totalPrice})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                          {cart?.items.map((product, idx, arr) => (
                            <React.Fragment key={idx}>
                              <ProductCard data={product} />
                              {arr.length - 1 !== idx && (
                                <hr className="border-t-black/10" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

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
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">No discoveries yet.</span>
            <Button className="rounded-full" asChild>
              <Link href="/discover">Discover</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
