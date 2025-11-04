import React from "react";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/product.types";

const ProductDetailsContent = ({ product }: { product: Product }) => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Product details
      </h3>
      <p className="text-black/70 text-sm sm:text-base mb-6">
        {product.description}
      </p>
      {/* <div className="mb-6 p-4 rounded-lg bg-[#F9F9F9] border border-black/10">
        <h4 className="font-medium mb-2">Curator’s Note</h4>
        <p className="text-black/70 text-sm sm:text-base">
          Discovered on a journey through Thimphu, this shawl stood apart for
          its warmth and character. Sonam explained that his weaving reflects
          the rhythm of mountain winds. It is a piece that feels alive in its
          simplicity.
        </p>
      </div> */}
      <ProductDetails />
    </section>
  );
};

export default ProductDetailsContent;
