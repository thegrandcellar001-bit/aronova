"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import ProductImageLightbox from "@/components/common/product-image-lightbox";
import { Product } from "@/types/product.types";

interface PhotoSectionProps {
  data: Product;
}

const PhotoSection = ({ data }: PhotoSectionProps) => {
  // Filter out any empty images
  const validImages = data.images?.filter(Boolean) || [];

  const [selected, setSelected] = useState<string[]>([validImages[0] || ""]);
  const [openLightbox, setOpenLightbox] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-4">
        {validImages.length > 0 && (
          <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-4 w-full lg:w-fit items-center lg:justify-start justify-start mt-4 lg:mt-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {validImages.map((photo, index) => (
              <button
                key={index}
                type="button"
                className={`bg-cream/50 w-full min-w-[80px] max-w-[100px] lg:max-w-[120px] aspect-square overflow-hidden border-2 transition-all duration-300 flex-shrink-0 p-1 ${
                  selected[0] === photo
                    ? "border-gold ring-2 ring-gold/20"
                    : "border-transparent hover:border-black/20"
                }`}
                onClick={() => setSelected([photo])}
              >
                <Image
                  src={photo}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt={`${data.name} - Image ${index + 1}`}
                  priority={index === 0}
                />
              </button>
            ))}
          </div>
        )}

        {selected[0] && (
          <div
            className="group relative flex items-center justify-center bg-cream/30  w-full mx-auto h-full min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] overflow-hidden cursor-zoom-in border border-black/5"
            onClick={() => setOpenLightbox(true)}
          >
            <Image
              src={selected[0]}
              width={600}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={data.name}
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                <i className="far fa-search-plus text-2xl text-black"></i>
              </div>
            </div>
          </div>
        )}
      </div>

      {openLightbox && selected[0] && (
        <ProductImageLightbox
          images={validImages}
          open={openLightbox}
          initialIndex={validImages.indexOf(selected[0])}
          onClose={() => setOpenLightbox(false)}
        />
      )}
    </Fragment>
  );
};

export default PhotoSection;
