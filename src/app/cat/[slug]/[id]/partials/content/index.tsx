import React, { Fragment, useEffect } from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import { useAuthStore } from "@/lib/stores/auth";
import Link from "next/link";
import { useWishlist } from "@/app/providers/wishlist-provider";
import { Spinner } from "@/components/ui/spinner";
import AddToCartSection from "./AddToCartSection";
import { useCart } from "@/app/providers/cart-provider";

const Header = ({ data }: { data: Product }) => {
  const { isAuthenticated } = useAuthStore();
  const { addItem, removeItem, itemExists, loading } = useWishlist();
  const { findItems } = useCart();

  const hasVariants = data.variants && data.variants.length > 0;

  const [colorSelection, setColorSelection] = React.useState<string | null>(
    hasVariants ? null : null
  );
  const [sizeSelection, setSizeSelection] = React.useState<string | null>(
    hasVariants ? null : null
  );
  const [selectedVariant, setSelectedVariant] = React.useState<any>(
    hasVariants ? null : null
  );

  const inWishlist = itemExists(data.id);

  const handleWishlistClick = async () => {
    if (inWishlist) {
      await removeItem(data.id);
    } else {
      await addItem({
        productId: data.id,
        quantity: 1,
        variantId: data.variants?.[0]?.id,
      });
    }
  };

  useEffect(() => {
    const items = findItems(data.id);
    // Autoselect ONLY when exactly 1 variant in cart
    if (items && items.length === 1) {
      const variant = data.variants?.find((v) => v.id === items[0].variantId);
      if (variant) {
        setSelectedVariant(variant);
        setColorSelection(variant.color ?? null);
        setSizeSelection(variant.size ?? null);
        return; // stop here — don't overwrite
      }
    }
    // No cart items - if product has only 1 variant, autoselect it
    if (hasVariants && data.variants.length === 1) {
      const v = data.variants[0];
      setSelectedVariant(v);
      setColorSelection(v.color ?? null);
      setSizeSelection(v.size ?? null);
      return;
    }
  }, [data, findItems]);

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold md:leading-10 mb-3 md:mb-3.5 capitalize">
              {data.name}
            </h1>
          </div>
          <div className="flex items-center justify-between mb-3 sm:mb-3.5">
            <div className="flex items-center">
              <Rating
                initialValue={data.average_rating}
                allowFraction
                SVGclassName="inline-block"
                emptyClassName="fill-gray-50"
                size={25}
                readonly
              />
              <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
                {data.average_rating.toFixed(1)}
                <span className="text-black/60">/5</span>
              </span>
            </div>

            <div
              className="flex items-center justify-center cursor-pointer mr-4"
              title="Add to wishlist"
              onClick={handleWishlistClick}
            >
              {loading.add || loading.remove ? (
                <Spinner className="w-6 h-6" />
              ) : (
                <i
                  className={`fa-heart text-2xl ${
                    inWishlist ? "fas text-red-500" : "far text-gray-500"
                  }`}
                />
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {selectedVariant ? (
              <Fragment>
                <span className="text-black text-xl xl:text-2xl">
                  ₦{selectedVariant.pricing.final_price.toLocaleString()}
                </span>
                {selectedVariant.pricing.discount > 0 && (
                  <Fragment>
                    <span className="text-black/40 line-through text-xl xl:text-2xl">
                      ₦{selectedVariant.pricing.base_price.toLocaleString()}
                    </span>
                    <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                      {`-${selectedVariant.pricing.discount}%`}
                    </span>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <span className="text-black text-xl xl:text-2xl">
                  ₦{data.pricing.final_price.toLocaleString()}
                </span>
                {data.pricing.discount > 0 && (
                  <>
                    <span className="text-black/40 line-through text-xl xl:text-2xl">
                      ₦{data.pricing.base_price.toLocaleString()}
                    </span>
                    <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                      {`-${data.pricing.discount}%`}
                    </span>
                  </>
                )}
              </Fragment>
            )}
          </div>
          {hasVariants && (
            <Fragment>
              {data.variants.some((v: any) => !!v.color) && (
                <Fragment>
                  <hr className="h-px border-t-black/10 mb-5" />
                  <ColorSelection
                    data={data}
                    colorSelection={colorSelection}
                    setColorSelection={setColorSelection}
                    setSizeSelection={setSizeSelection}
                    setSelectedVariant={setSelectedVariant}
                  />
                  <hr className="h-px border-t-black/10 my-5" />
                </Fragment>
              )}
              {data.variants.some((v: any) => !!v.size) && (
                <SizeSelection
                  data={data}
                  colorSelection={colorSelection}
                  sizeSelection={sizeSelection}
                  setSizeSelection={setSizeSelection}
                  setSelectedVariant={setSelectedVariant}
                />
              )}
              <hr className="hidden md:block h-px border-t-black/10 my-5" />
            </Fragment>
          )}
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="bg-primary text-white p-3 mt-6 w-full rounded-none text-md cursor-pointer flex items-center justify-center"
            >
              <i className="far fa-info-circle text-md mr-2"></i> Create an
              account / login to order
            </Link>
          ) : (
            <AddToCartSection
              data={data}
              hasVariants={hasVariants}
              selectedVariant={selectedVariant}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
