"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { Fragment, useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";
import { useCart } from "@/app/providers/cart-provider";
import RemoveFromCartBtn from "./RemoveFromCartBtn";

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const {
    inCart,
    findItem,
    increaseQuantity,
    decreaseQuantity,
    updateLoading,
  } = useCart();

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
          <RemoveFromCartBtn item_id={itemId} />
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
          <AddToCartBtn item={data} quantity={quantity} />
        </Fragment>
      )}
    </div>
  );
};

export default AddToCardSection;
