import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FiSliders } from "react-icons/fi";
import Filters from ".";
import { Button } from "@/components/ui/buttons";

const MobileFilters = ({
  categories,
  categoryData,
  filters,
  setFilters,
  onApply,
}: {
  categories: any[];
  categoryData: any;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onApply: (filters: any) => void;
}) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full bg-white cursor-pointer"
          >
            <i className="text-base far fa-filter" /> Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90%] w-[95%] pb-10">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <DrawerTitle className="hidden">filters</DrawerTitle>
            <DrawerDescription className="hidden">filters</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[90%] overflow-y-auto w-full px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <Filters
              categories={categories}
              categoryData={categoryData}
              filters={filters}
              setFilters={setFilters}
              onApply={onApply}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileFilters;
