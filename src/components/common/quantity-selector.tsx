"use client";

import { useState } from "react";
import { Input } from "../ui/input";

interface QuantitySelectorProps {
  onChange: (value: number) => void;
}

export default function QuantitySelector({ onChange }: QuantitySelectorProps) {
  const [value, setValue] = useState(1);

  const clamp = (num: number) => Math.min(Math.max(num, 1), 99);

  const decrement = () => {
    setValue((prev) => {
      const newValue = clamp(prev - 1);
      onChange(newValue);
      return newValue;
    });
  };

  const increment = () => {
    setValue((prev) => {
      const newValue = clamp(prev + 1);
      onChange(newValue);
      return newValue;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setValue(val === "" ? 0 : Number(val)); // allow empty while typing
    }
  };

  const handleBlur = () => {
    const newValue = clamp(value || 1); // fallback to 1 if empty
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center h-[44px] w-[160px] border border-gray-300">
      <button
        type="button"
        className="border-r border-gray-300 px-2 w-[44px] h-[40px] flex items-center justify-center cursor-pointer"
        onClick={decrement}
      >
        <i className="fal fa-minus text-lg"></i>
      </button>

      <Input
        className="rounded-none border-0 w-[80px] text-center"
        value={value === 0 ? "" : value} // allow clearing
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputMode="numeric"
      />

      <button
        type="button"
        className="border-l border-gray-300 px-2 w-[44px] h-[40px] flex items-center justify-center cursor-pointer bg-primary text-white"
        onClick={increment}
      >
        <i className="fal fa-plus text-lg"></i>
      </button>
    </div>
  );
}
