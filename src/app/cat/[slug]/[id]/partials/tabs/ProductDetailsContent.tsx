import React from "react";
import { Product } from "@/types/product.types";

const ProductDetailsContent = ({ product }: { product: Product }) => {
  return (
    <section>
      <p className="text-black/70 text-sm sm:text-base mb-6">
        {product.description}
      </p>
    </section>
  );
};

export default ProductDetailsContent;
