"use client";

import {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  ForwardedRef,
  HTMLAttributes,
} from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsUpDown, CheckIcon, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import { countries } from "country-data-list";

interface Country {
  name: string;
  alpha2: string;
  emoji?: string;
  status?: string;
  ioc?: string;
}

interface CountryDropdownProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
  options?: Country[];
  onChange?: (value: Country | Country[]) => void;
  value?: string | string[];
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  inline?: boolean;
  multiple?: boolean;
  textSize?: "sm" | "base" | "lg" | "xl";
  className?: string;
}

const textSizeClasses: Record<
  NonNullable<CountryDropdownProps["textSize"]>,
  string
> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.alpha2 &&
        country.emoji &&
        country.status !== "deleted" &&
        country.ioc !== "PRK"
    ),
    onChange,
    value,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    inline = false,
    multiple = false,
    textSize = "base",
    className,
    ...props
  }: CountryDropdownProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  // ✅ fixed: only update when state actually changes
  useEffect(() => {
    if (!value) {
      if (selectedCountries.length > 0) {
        setSelectedCountries([]);
      }
      return;
    }

    if (multiple && Array.isArray(value)) {
      const initialCountries = options.filter((country) =>
        value.includes(country.alpha2)
      );

      const changed =
        initialCountries.length !== selectedCountries.length ||
        !initialCountries.every((c) =>
          selectedCountries.some((s) => s.alpha2 === c.alpha2)
        );

      if (changed) {
        setSelectedCountries(initialCountries);
      }
    } else if (!multiple && typeof value === "string") {
      const initialCountry = options.find(
        (country) => country.alpha2 === value
      );
      const newSelection = initialCountry ? [initialCountry] : [];

      if (
        newSelection.length !== selectedCountries.length ||
        newSelection[0]?.alpha2 !== selectedCountries[0]?.alpha2
      ) {
        setSelectedCountries(newSelection);
      }
    }
  }, [value, options, multiple, selectedCountries]);

  const handleSelect = useCallback(
    (country: Country) => {
      if (multiple) {
        const newSelection = selectedCountries.some(
          (c) => c.alpha2 === country.alpha2
        )
          ? selectedCountries.filter((c) => c.alpha2 !== country.alpha2)
          : [...selectedCountries, country];

        setSelectedCountries(newSelection);
        onChange?.(newSelection);
      } else {
        setSelectedCountries([country]);
        onChange?.(country);
        setOpen(false);
      }
    },
    [onChange, multiple, selectedCountries]
  );

  const triggerClasses = cn(
    "flex h-12 w-full items-center justify-between whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 ring-offset-background focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-colors duration-200",
    textSizeClasses[textSize],
    slim && "gap-1 w-min",
    inline && "rounded-r-none border-r-0 gap-1 pr-1 w-min",
    className
  );

  const ariaLabel =
    selectedCountries.length > 0
      ? multiple
        ? `${selectedCountries.length} countries selected`
        : `Selected country: ${selectedCountries[0].name}`
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        {...props}
      >
        {selectedCountries.length > 0 ? (
          <div className="flex items-center flex-grow gap-2 overflow-hidden">
            {multiple ? (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountries.length} selected
              </span>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-4 h-4 shrink-0 overflow-hidden rounded-full">
                  <CircleFlag
                    countryCode={selectedCountries[0].alpha2.toLowerCase()}
                    height={16}
                  />
                </div>
                {slim === false && !inline && (
                  <span
                    className={cn(
                      "overflow-hidden text-ellipsis whitespace-nowrap text-black",
                      textSizeClasses[textSize]
                    )}
                  >
                    {selectedCountries[0].name}
                  </span>
                )}
              </>
            )}
          </div>
        ) : (
          <span
            className={cn(
              "flex items-center gap-2 text-gray-400",
              textSizeClasses[textSize]
            )}
          >
            {inline || slim ? <Globe size={16} /> : placeholder}
          </span>
        )}

        {!inline ? (
          <ChevronDown size={16} className="text-black opacity-50" />
        ) : (
          <ChevronsUpDown size={16} className="text-black opacity-50" />
        )}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command
          className="w-full max-h-[200px] sm:max-h-[270px]"
          role="listbox"
          aria-label="Country selection"
        >
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput
                placeholder="Search country..."
                className={cn(
                  "h-12 placeholder:text-gray-400 focus:placeholder:text-gray-400",
                  textSizeClasses[textSize]
                )}
                aria-label="Search country"
              />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option) => {
                  const isSelected = selectedCountries.some(
                    (c) => c.alpha2 === option.alpha2
                  );
                  return (
                    <CommandItem
                      className={cn(
                        "flex items-center w-full gap-2 py-2.5",
                        textSizeClasses[textSize]
                      )}
                      key={option.alpha2}
                      onSelect={() => handleSelect(option)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex flex-grow space-x-2 overflow-hidden">
                        <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                          <CircleFlag
                            countryCode={option.alpha2.toLowerCase()}
                            height={20}
                          />
                        </div>
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {option.name}
                        </span>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef<
  HTMLButtonElement,
  CountryDropdownProps
>(CountryDropdownComponent);
