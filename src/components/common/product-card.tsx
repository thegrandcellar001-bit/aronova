import React from "react";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link key={product.id} href={`/item/${product.id}`}>
      <div className="group cursor-pointer animate-fade-in">
        <div className="relative aspect-3/4 mb-4 overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.pricing.discount > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-2 rounded-full bg-secondary text-deep-green absolute bottom-3 right-2">
              {`-${product.pricing.discount}%`}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {product.merchant_store_name}
          </p>
          <h3 className="font-sans text-base text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center space-x-[5px] xl:space-x-2.5 relative">
            {product.pricing.discount > 0 ? (
              <span className="text-black text-xl xl:text-2xl">
                ₦{product.pricing.final_price.toLocaleString()}
              </span>
            ) : (
              <span className="text-black text-xl xl:text-2xl">
                ₦{product.pricing.base_price.toLocaleString()}
              </span>
            )}
            {product.pricing.discount > 0 && (
              <span className="text-black/40 line-through text-xl xl:text-2xl">
                ₦{product.pricing.base_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
