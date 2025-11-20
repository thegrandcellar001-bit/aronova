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
    <div>
      <h6 className="text-xl md:text-2xl font-bold text-black">
        3. Shipping Method
      </h6>
      <div className="flex flex-col space-y-4 mt-6">
        <ToggleGroup
          type="single"
          className="flex flex-col space-y-4"
          defaultValue={selectedDeliveryMethod}
          onValueChange={setSelectedDeliveryMethod}
        >
          <ToggleGroupItem
            value="standard"
            aria-label="Standard"
            className="flex items-center justify-between font-normal w-full h-[80px] text-left data-[state=on]:ring-primary data-[state=on]:ring-2 data-[state=on]:bg-primary/10"
          >
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-1.5">
                <p className="leading-none font-medium">Standard</p>
                <p className="text-muted-foreground text-sm">
                  Standard shipping takes 3-5 business days.
                </p>
              </div>

              <i className="far fa-truck text-lg"></i>
            </div>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="express"
            aria-label="Express"
            className="flex items-center justify-between font-normal w-full h-[80px] text-left data-[state=on]:ring-primary data-[state=on]:ring-2 data-[state=on]:bg-primary/10"
          >
            <div className="flex items-center justify-between font-normal w-full">
              <div className="flex flex-col gap-1.5">
                <p className="leading-none font-medium">Express</p>
                <p className="text-muted-foreground text-sm">
                  Express shipping takes 1-2 business days.
                </p>
              </div>

              <i className="far fa-truck-fast text-lg"></i>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>

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
