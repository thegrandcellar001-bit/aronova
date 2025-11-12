import React from "react";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";
import { Button } from "@/components/ui/button";

const Filters = ({
  filters,
  setFilters,
  onApply,
}: {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onApply: (filters: any) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection
        priceRange={filters.priceRange}
        setPriceRange={(range: [number, number]) =>
          setFilters({ ...filters, priceRange: range })
        }
      />
      <hr className="border-t-black/10" />
      <ColorsSection
        selectedColors={filters.colors}
        setSelectedColors={(colors: string[]) =>
          setFilters({ ...filters, colors })
        }
      />
      <hr className="border-t-black/10" />
      <SizeSection
        selectedSizes={filters.sizes}
        setSelectedSizes={(sizes: string[]) =>
          setFilters({ ...filters, sizes })
        }
      />
      <hr className="border-t-black/10 mb-3" />
      <Button
        type="button"
        variant="default"
        className="w-full text-sm font-medium py-4 h-12 cursor-pointer"
        onClick={() => onApply(filters)}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default Filters;
