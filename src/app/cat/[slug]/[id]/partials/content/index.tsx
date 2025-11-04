import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-[40px] md:leading-10 mb-3 md:mb-3.5 capitalize">
            {data.name}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
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
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {data.pricing.discount > 0 ? (
              <span className="text-black text-xl xl:text-2xl">
                ${data.pricing.final_price}
              </span>
            ) : (
              <span className="text-black text-xl xl:text-2xl">
                ${data.pricing.base_price}
              </span>
            )}
            {data.pricing.discount > 0 && (
              <span className="text-black/40 line-through text-xl xl:text-2xl">
                ${data.pricing.base_price}
              </span>
            )}
            {data.pricing.discount > 0 && (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.pricing.discount}%`}
              </span>
            )}
          </div>
          <hr className="h-px border-t-black/10 mb-5" />
          <ColorSelection />
          <hr className="h-px border-t-black/10 my-5" />
          <SizeSelection />
          <hr className="hidden md:block h-px border-t-black/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
