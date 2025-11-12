import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const PriceSection = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}) => {
  const [range, setRange] = useState<[number, number]>(priceRange);

  // Sync local range with parent priceRange whenever it changes
  useEffect(() => {
    setRange(priceRange);
  }, [priceRange]);

  const handleInputChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...range] as [number, number];
    newRange[index] = value;

    // Ensure min ≤ max
    if (newRange[0] > newRange[1]) {
      if (index === 0) newRange[1] = value;
      else newRange[0] = value;
    }

    setRange(newRange);
    setPriceRange(newRange); // update parent immediately
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4 max-w-[280px]">
          <Slider
            value={range}
            onValueChange={(val: [number, number]) => {
              setRange(val);
              setPriceRange(val);
            }}
            min={50}
            max={100000}
            step={50}
            label="₦"
            minStepsBetweenThumbs={1}
            color="var(--secondary)"
            className="mx-4 overflow-visible w-auto"
          />
          <div className="flex items-center justify-between gap-x-4 pl-2 mt-12">
            <Input
              type="number"
              min={1}
              className="h-10"
              placeholder="min"
              value={range[0]}
              onChange={(e) => handleInputChange(0, Number(e.target.value))}
            />
            <span className="text-black font-medium">-</span>
            <Input
              min={1}
              type="number"
              className="h-10"
              placeholder="max"
              value={range[1]}
              onChange={(e) => handleInputChange(1, Number(e.target.value))}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
