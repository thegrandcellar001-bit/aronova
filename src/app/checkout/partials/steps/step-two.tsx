"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";

export default function StepTwo({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) {
  return (
    <div>
      <h6 className="text-xl md:text-2xl font-bold text-black">
        2. Payment Method
      </h6>
      <div className="flex flex-col space-y-4 mt-6">
        <h3 className="text-md flex items-center gap-2">
          We only support this payment method for now.
        </h3>

        <RadioGroup className="flex flex-col space-y-4" defaultValue="card">
          <Label
            htmlFor="method1"
            className="flex items-center gap-4 rounded-lg border-2 p-3 has-[data-state=checked]:border-primary h-30 md:h-25 cursor-pointer"
          >
            <RadioGroupItem value="card" className="h-[23px] w-[23px]" />
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-1.5">
                <p className="leading-none font-medium">Credit or debit card</p>
                <p className="text-muted-foreground text-sm">
                  Prepay with your credit or debit card. We accept all major
                  cards (VISA, MasterCard & Verve).
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
        </RadioGroup>

        <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
          <Button
            type="button"
            variant="ghost"
            className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
            onClick={prevStep}
          >
            <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
            Back
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
            onClick={nextStep}
          >
            Next{" "}
            <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
          </Button>
        </div>
      </div>
    </div>
  );
}
