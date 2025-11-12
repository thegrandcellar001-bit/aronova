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
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
        {validImages.length > 0 && (
          <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
            {validImages.map((photo, index) => (
              <button
                key={index}
                type="button"
                className="bg-[#F0EEED] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden"
                onClick={() => setSelected([photo])}
              >
                <Image
                  src={photo}
                  width={152}
                  height={167}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                  alt={data.name}
                  priority
                />
              </button>
            ))}
          </div>
        )}

        {selected[0] && (
          <div
            className="flex items-center justify-center bg-[#F0EEED] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0"
            onClick={() => setOpenLightbox(true)}
          >
            <Image
              src={selected[0]}
              width={444}
              height={530}
              className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
              alt={data.name}
              priority
              unoptimized
            />
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
