"use client";

import { Label } from "@/components/ui/label";
import Sidebar from "../partials/sidebar";
import BreadcrumbPayment from "./partials/payment-breadcrumb";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    "card"
  );

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  return (
    <main>
      <section className="px-6 max-w-7xl mx-auto">
        <BreadcrumbPayment />
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
          <Sidebar />
          <div className="flex flex-col gap-y-4 flex-1">
            <h3 className="font-semibold text-xl md:text-2xl">
              Payment Method
            </h3>
            <div className="flex flex-col gap-y-4 my-4">
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
                        Prepay with your credit or debit card. We accept all
                        major cards (VISA, MasterCard & Verve).
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
                        Go cashless, you can pay by cash or via bank transfer on
                        delivery.
                      </p>
                    </div>
                    <i className="far fa-dollar-sign text-2xl"></i>
                  </div>
                </Label>
              </RadioGroup>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
