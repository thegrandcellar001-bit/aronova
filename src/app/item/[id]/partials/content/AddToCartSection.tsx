"use client";

import React, { Fragment, useState } from "react";
import { Product, Variant } from "@/types/product.types";
import { useCart } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import CartCounter from "@/components/ui/CartCounter";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

const AddToCartSection = ({
  data,
  hasVariants,
  selectedVariant,
}: {
  data: Product;
  hasVariants: boolean;
  selectedVariant: Variant | null;
}) => {
  const [quantity, setQuantity] = useState(1);
  const {
    addItem,
    addLoading,
    removeItem,
    removeLoading,
    findItem,
    increaseQuantity,
    decreaseQuantity,
    updateLoading,
  } = useCart();

  const { toastError } = useToast();

  const inventory = hasVariants ? selectedVariant?.inventory : data.inventory;
  const availableQuantity = inventory?.available ?? 0;
  const stockStatus = inventory?.status ?? null;

  const cartItem = hasVariants
    ? selectedVariant
      ? findItem(data.id, selectedVariant.id)
      : null
    : findItem(data.id, null);

  const itemInCart = !!cartItem;
  const itemId = cartItem?.id;
  const itemQuantity = cartItem?.quantity ?? 0;

  const isVariantSelected = hasVariants ? !!selectedVariant : true;

  const handleAddToCart = async () => {
    if (hasVariants && !selectedVariant) {
      toastError("Please select options before adding to cart.");
      return;
    }

    await addItem(data, quantity, selectedVariant?.id ?? null);
  };

  const handleRemove = () => {
    if (!itemInCart) return;
    removeItem(itemId);
  };

  if (stockStatus === "out_of_stock") {
    return (
      <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10">
        <Button
          type="button"
          variant="default"
          className="w-full h-11 md:h-[52px] text-sm sm:text-base text-white bg-gray-400 cursor-not-allowed"
          disabled
        >
          Out of Stock
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {itemInCart ? (
        <Fragment>
          <CartCounter
            initialValue={itemQuantity}
            onAdd={() => increaseQuantity(itemId)}
            onRemove={() => decreaseQuantity(itemId)}
            limit={availableQuantity}
            loading={updateLoading}
          />

          <Button
            type="button"
            variant="destructive"
            className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all"
            onClick={handleRemove}
            disabled={removeLoading}
          >
            {removeLoading ? (
              <Spinner className="w-6 h-6 mx-auto" />
            ) : (
              "Remove from cart"
            )}
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <CartCounter
            initialValue={quantity}
            onAdd={(value) => setQuantity(value)}
            onRemove={(value) => setQuantity(value)}
            limit={availableQuantity}
            loading={false}
          />

          <Button
            type="button"
            variant="default"
            className={`w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all ${
              !isVariantSelected ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleAddToCart}
            disabled={addLoading || !isVariantSelected}
          >
            {addLoading ? (
              <Spinner className="w-6 h-6 mx-auto" />
            ) : (
              "Add to cart"
            )}
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default AddToCartSection;
