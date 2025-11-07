import React from "react";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import DressStyleSection from "./DressStyleSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";
import { Button } from "@/components/ui/button";

const Filters = () => {
  return (
    <div className="flex flex-col gap-4">
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <hr className="border-t-black/10" />
      <DressStyleSection />
      <Button
        type="button"
        variant="default"
        className="w-full text-sm font-medium py-4 h-12 cursor-pointer"
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default Filters;
