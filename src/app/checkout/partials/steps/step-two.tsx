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
    <div className="bg-white border p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">2</span>
        </div>
        <h3 className="font-semibold text-xl text-gray-900">Payment Method</h3>
      </div>
      <div className="space-y-4 mt-6">
        <p className="text-gray-600 flex items-center gap-2">
          <i className="fas fa-credit-card text-primary"></i>
          We currently support the following payment method:
        </p>

        <RadioGroup className="space-y-3" defaultValue="card">
          <Label
            htmlFor="method1"
            className="flex items-center gap-4 border-2 p-5 has-[data-state=checked]:border-primary has-[data-state=checked]:bg-primary/5 cursor-pointer transition-all hover:border-primary/50"
          >
            <RadioGroupItem value="card" className="h-5 w-5" />
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-gray-900">
                  Credit or Debit Card
                </p>
                <p className="text-gray-600 text-sm">
                  Securely pay with your credit or debit card. We accept all
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
        </RadioGroup>

        <div className="mt-6 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="text-base font-medium w-full py-6 h-auto hover:bg-gray-50"
            onClick={prevStep}
          >
            <FaArrowLeft className="text-lg mr-2" />
            Back
          </Button>
          <Button
            type="button"
            variant="default"
            className="text-base font-semibold w-full py-6 h-auto group cursor-pointer"
            onClick={nextStep}
          >
            Continue
            <FaArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
          </Button>
        </div>
      </div>
    </div>
  );
}
