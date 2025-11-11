"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { Fragment, useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import { useCart } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const AddToCartSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const {
    addItem,
    addLoading,
    removeItem,
    removeLoading,
    inCart,
    findItem,
    increaseQuantity,
    decreaseQuantity,
    updateLoading,
  } = useCart();

  console.log(data);

  const itemInCart = inCart(data.id);
  const itemId = itemInCart ? findItem(data.id).id : null;

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {itemInCart ? (
        <Fragment>
          <CartCounter
            initialValue={quantity}
            onAdd={async (value) => {
              await increaseQuantity(itemId);
            }}
            onRemove={async (value) => {
              await decreaseQuantity(itemId);
            }}
            loading={updateLoading}
          />
          <Button
            type="button"
            variant="destructive"
            className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
            onClick={() => removeItem(itemId)}
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
            onAdd={(value) => {
              setQuantity(value);
            }}
            onRemove={(value) => {
              setQuantity(value);
            }}
            loading={false}
          />
          <Button
            type="button"
            variant="default"
            className="w-full ml-3 sm:ml-5 h-11 md:h-[52px] text-sm sm:text-base text-white transition-all cursor-pointer"
            onClick={() =>
              addItem(data, quantity, data.variants && data.variants[0].id)
            }
            disabled={addLoading}
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
