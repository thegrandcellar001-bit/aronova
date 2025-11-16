"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type CartCounterProps = {
  isZeroDelete?: boolean;
  onAdd?: (value: number) => void;
  onRemove?: (value: number) => void;
  className?: string;
  loading: boolean;
  initialValue?: number;
  limit?: number;
};

const CartCounter = ({
  isZeroDelete,
  onAdd,
  onRemove,
  className,
  loading,
  initialValue = 1,
  limit,
}: CartCounterProps) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const addToCart = () => {
    if (onAdd) {
      onAdd(counter + 1);
    }
    setCounter(counter + 1);
  };

  const remove = () => {
    if ((counter === 1 && !isZeroDelete) || counter <= 0) return;

    if (onRemove) {
      onRemove(counter - 1);
    }
    if (counter - 1 <= 0) return;
    setCounter(counter - 1);
  };

  useEffect(() => {
    if (limit !== undefined && initialValue > limit) {
      setCounter(limit);
    } else {
      setCounter(initialValue);
    }
  }, [initialValue, limit]);

  return (
    <div
      className={cn(
        "bg-[#F0F0F0] w-full min-w-[110px] max-w-[110px] sm:max-w-[170px] py-3 md:py-3.5 px-4 sm:px-5  flex items-center justify-between",
        className
      )}
    >
      {loading ? (
        <Spinner className="w-6 h-6 mx-auto" />
      ) : (
        <Fragment>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-5 w-5 sm:h-6 sm:w-6 text-xl hover:bg-transparent cursor-pointer"
            onClick={() => remove()}
            disabled={(counter === 1 && !isZeroDelete) || counter <= 0}
          >
            <FaMinus />
          </Button>
          <span className="font-medium text-sm sm:text-base">
            {!isZeroDelete ? counter : initialValue}
          </span>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-5 w-5 sm:h-6 sm:w-6 text-xl hover:bg-transparent cursor-pointer"
            onClick={() => {
              // prevent increment when limit explicitly 0 (not available) or we've reached the limit
              if (limit === 0 || (limit !== undefined && counter >= limit))
                return;
              addToCart();
            }}
            disabled={limit === 0 || (limit !== undefined && counter >= limit)}
            aria-disabled={
              limit === 0 || (limit !== undefined && counter >= limit)
            }
            title={limit === 0 ? "Not available" : undefined}
          >
            <FaPlus />
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default CartCounter;
