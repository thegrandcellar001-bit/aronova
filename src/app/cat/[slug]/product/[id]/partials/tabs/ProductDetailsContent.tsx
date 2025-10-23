import React from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Provenance & Details
      </h3>
      <p className="text-black/70 text-sm sm:text-base mb-6">
        Crafted in the Himalayas by Sonam Dorji, this handwoven cashmere shawl preserves centuries of technique. Authenticated by Aronova, it carries provenance you can trust, and arrives ready to be cherished.
      </p>
      <p className="text-black/70 text-sm sm:text-base mb-6">
        This shawl, woven in the valleys of Bhutan by artisan Sonam Dorji, represents a tradition passed down through generations. Each thread carries the subtle irregularities of hand craftsmanship — proof of authenticity and heritage. Certified by Aronova’s authentication team, it is both a functional piece and a cultural story. Delivered with your provenance certificate and optional white-glove service.
      </p>
      <div className="mb-6 p-4 rounded-lg bg-[#F9F9F9] border border-black/10">
        <h4 className="font-medium mb-2">Curator’s Note</h4>
        <p className="text-black/70 text-sm sm:text-base">
          Discovered on a journey through Thimphu, this shawl stood apart for its warmth and character. Sonam explained that his weaving reflects the rhythm of mountain winds. It is a piece that feels alive in its simplicity.
        </p>
      </div>
      <ProductDetails />
    </section>
  );
};

export default ProductDetailsContent;
