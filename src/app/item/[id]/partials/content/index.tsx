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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Photo Section */}
        <div>
          <PhotoSection data={data} />
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Header with Title and Wishlist */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight capitalize">
              {data.name}
            </h1>

            <button
              className="group flex-shrink-0 w-12 h-12 rounded-full border-2 border-black/10 hover:border-gold hover:bg-gold/5 flex items-center justify-center transition-all duration-300"
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlistClick}
            >
              {loading.add || loading.remove ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <i
                  className={`fa-heart text-xl transition-colors ${
                    inWishlist
                      ? "fas text-red-500"
                      : "far text-black/40 group-hover:text-gold"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Rating
              initialValue={data.average_rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-200"
              size={22}
              readonly
            />
            <span className="text-sm text-black/80 font-medium">
              {data.average_rating.toFixed(1)}
              <span className="text-black/50"> / 5</span>
            </span>
          </div>

          {/* Price Section */}
          <div className="bg-cream/30 rounded-xl p-6 border border-black/5">
            <div className="flex items-center gap-3 flex-wrap">
              {selectedVariant ? (
                <Fragment>
                  <span className="text-3xl lg:text-4xl font-bold text-black">
                    ₦{selectedVariant.pricing.final_price.toLocaleString()}
                  </span>
                  {selectedVariant.pricing.discount > 0 && (
                    <Fragment>
                      <span className="text-xl text-black/40 line-through">
                        ₦{selectedVariant.pricing.base_price.toLocaleString()}
                      </span>
                      <span className="font-semibold text-sm py-1.5 px-4 rounded-full bg-red-500/10 text-red-600">
                        Save {selectedVariant.pricing.discount}%
                      </span>
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <span className="text-3xl lg:text-4xl font-bold text-black">
                    ₦{data.pricing.final_price.toLocaleString()}
                  </span>
                  {data.pricing.discount > 0 && (
                    <>
                      <span className="text-xl text-black/40 line-through">
                        ₦{data.pricing.base_price.toLocaleString()}
                      </span>
                      <span className="font-semibold text-sm py-1.5 px-4 rounded-full bg-red-500/10 text-red-600">
                        Save {data.pricing.discount}%
                      </span>
                    </>
                  )}
                </Fragment>
              )}
            </div>
          </div>

          {/* Product Description Preview */}
          {data.description && (
            <div className="border-t border-black/10 pt-6">
              <p className="text-black/70 leading-relaxed line-clamp-3">
                {data.description}
              </p>
            </div>
          )}

          {/* Variants Selection */}
          {hasVariants && (
            <div className="space-y-5 border-t border-black/10 pt-6">
              {data.variants.some((v: any) => !!v.color) && (
                <ColorSelection
                  data={data}
                  colorSelection={colorSelection}
                  setColorSelection={setColorSelection}
                  setSizeSelection={setSizeSelection}
                  setSelectedVariant={setSelectedVariant}
                />
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
            </div>
          )}

          {/* Add to Cart / Login Section */}
          <div className="border-t border-black/10 pt-6">
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="bg-black hover:bg-black/90 text-white p-4 w-full rounded-lg text-base font-medium cursor-pointer flex items-center justify-center gap-2 transition-colors"
              >
                <i className="far fa-user-circle text-lg"></i>
                Create an account / login to order
              </Link>
            ) : (
              <AddToCartSection
                data={data}
                hasVariants={hasVariants}
                selectedVariant={selectedVariant}
              />
            )}
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-cream/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <i className="far fa-shield-check text-gold"></i>
              </div>
              <div>
                <p className="text-xs text-black/50">Authenticity</p>
                <p className="text-sm font-medium">Verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-cream/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <i className="far fa-truck text-gold"></i>
              </div>
              <div>
                <p className="text-xs text-black/50">Delivery</p>
                <p className="text-sm font-medium">Fast Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
