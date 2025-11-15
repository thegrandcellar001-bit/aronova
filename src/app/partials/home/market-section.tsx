"use client";

import { useProduct } from "@/app/providers/product-provider";
import ApiLoader from "@/components/common/api-loader";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { useEffect, useState } from "react";

const MarketSection = () => {
  const { loading, fetchProducts } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(3);
      if (data && data.products) {
        setProducts(data.products);
      }
    };

    loadProducts();
  }, []);

  const productsData = products.length ? products : [];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-20 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            The Market
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked Nigerian brands redefining craftsmanship for the global
            stage.
          </p>
        </div>

        {/* Product Grid */}
        {loading.products ? (
          <ApiLoader message="Loading products..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {productsData ? (
              productsData.map((product, index) => (
                <Link
                  href={`/cat/${product.category_slug}/${product.id}`}
                  key={index}
                  className="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="aspect-4/5 overflow-hidden mb-4 bg-secondary">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground tracking-wider uppercase">
                      {product.merchant_store_name}
                    </p>
                    <h3 className="text-xl text-foreground">{product.name}</h3>
                    <p className="font-sans text-foreground font-medium">
                      {product.pricing.final_price.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center flex-col gap-y-6 text-gray-500 mt-32">
                <i className="fal fa-shopping-cart text-6xl" />
                <span className="block mb-4">No products available yet.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketSection;
