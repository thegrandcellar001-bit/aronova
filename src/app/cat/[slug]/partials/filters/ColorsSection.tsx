import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const ColorsSection = ({
  selectedColors,
  setSelectedColors,
}: {
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}) => {
  const colors = [
    { title: "green", className: "bg-green-600" },
    { title: "red", className: "bg-red-600" },
    { title: "yellow", className: "bg-yellow-300" },
    { title: "orange", className: "bg-orange-600" },
    { title: "cyan", className: "bg-cyan-400" },
    { title: "blue", className: "bg-blue-600" },
    { title: "purple", className: "bg-purple-600" },
    { title: "pink", className: "bg-pink-600" },
    { title: "white", className: "bg-white" },
    { title: "black", className: "bg-black" },
  ];

  const toggleColor = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    );
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colors.map((color) => (
              <button
                key={color.title}
                type="button"
                className={cn([
                  color.className,
                  "w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20",
                ])}
                onClick={() => toggleColor(color.title)}
              >
                {selectedColors.includes(color.title) && (
                  <i className="far fa-check  text-lg text-white" />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
