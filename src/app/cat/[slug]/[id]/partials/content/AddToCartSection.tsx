"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { Fragment, useState } from "react";
import { Product, Variant } from "@/types/product.types";
import { useCart } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

const AddToCartSection = ({
  data,
  hasVariants,
  selectedVariant,
}: {
  data: Product;
  hasVariants: boolean;
  selectedVariant: Variant;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
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

  const cartItem = selectedVariant
    ? findItem(data.id, selectedVariant.id)
    : findItem(data.id, null);

  const itemInCart = !!cartItem;
  const itemId = cartItem?.id;
  const itemQuantity = cartItem?.quantity ?? 0;
  const isVariantSelected = hasVariants ? !!selectedVariant : true;

  const variantQuantity = selectedVariant
    ? selectedVariant.inventory.available
    : 0;
  const variantStatus = selectedVariant ? selectedVariant.inventory.status : "";

  const handleAddToCart = async () => {
    if (data.variants && !selectedVariant) {
      toastError("Please select a color and size before adding to cart.");
      return;
    }

    await addItem(data, quantity, selectedVariant?.id);
  };

  const handleRemove = () => {
    if (!itemInCart) return;
    removeItem(itemId);
  };

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {itemInCart ? (
        <Fragment>
          {variantStatus === "out_of_stock" ? (
            <Button
              type="button"
              variant="default"
              className="w-full h-11 md:h-[52px] text-sm sm:text-base text-white bg-gray-400 cursor-not-allowed"
              disabled={true}
            >
              Out of Stock
            </Button>
          ) : (
            <Fragment>
              <CartCounter
                initialValue={itemQuantity}
                onAdd={async (value) => {
                  await increaseQuantity(itemId);
                }}
                onRemove={async (value) => {
                  await decreaseQuantity(itemId);
                }}
                limit={variantQuantity}
                loading={updateLoading}
              />
              <Button
                type="button"
                variant="destructive"
                className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
                onClick={() => handleRemove()}
                disabled={removeLoading}
              >
                {removeLoading ? (
                  <Spinner className="w-6 h-6 mx-auto" />
                ) : (
                  "Remove from cart"
                )}
              </Button>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {variantStatus === "out_of_stock" ? (
            <Button
              type="button"
              variant="default"
              className="w-full h-11 md:h-[52px] text-sm sm:text-base text-white bg-gray-400 cursor-not-allowed"
              disabled={true}
            >
              Out of Stock
            </Button>
          ) : (
            <Fragment>
              <CartCounter
                initialValue={quantity}
                onAdd={(value) => {
                  setQuantity(value);
                }}
                onRemove={(value) => {
                  setQuantity(value);
                }}
                limit={variantQuantity}
                loading={false}
              />
              <Button
                type="button"
                variant="default"
                className={`w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all ${
                  !isVariantSelected ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => handleAddToCart()}
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
        </Fragment>
      )}
    </div>
  );
};

export default AddToCartSection;
