"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function StepThree({
  prevStep,
  nextStep,
  setStep,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}: {
  prevStep: () => void;
  nextStep: () => void;
  setStep: (step: number) => void;
  selectedDeliveryMethod: string;
  setSelectedDeliveryMethod: (method: string) => void;
}) {
  return (
    <div className="bg-white border p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">3</span>
        </div>
        <h3 className="font-semibold text-xl text-gray-900">Shipping Method</h3>
      </div>
      <div className="space-y-4 mt-6">
        <ToggleGroup
          type="single"
          className="gap-3 flex-wrap"
          defaultValue={selectedDeliveryMethod}
          onValueChange={setSelectedDeliveryMethod}
        >
          <ToggleGroupItem
            value="standard"
            aria-label="Standard"
            className="flex items-center justify-between font-normal w-full h-auto p-5 text-left border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <i className="fas fa-truck text-primary"></i>
                  <p className="font-semibold text-gray-900">
                    Standard Shipping
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Delivery in 3-5 business days
                </p>
              </div>
            </div>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="express"
            aria-label="Express"
            className="flex items-center justify-between font-normal w-full h-auto p-5 text-left border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <i className="fas fa-truck-fast text-primary"></i>
                  <p className="font-semibold text-gray-900">
                    Express Shipping
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Delivery in 1-2 business days
                </p>
              </div>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>

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
