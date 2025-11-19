"use client";

import { Shield, Award, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../partials/home/navigation";
import { useProduct } from "../providers/product-provider";
import { Product } from "@/types/product.types";
import { Fragment, useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";

const PreOwned = () => {
  const { loading, fetchCategoryProducts } = useProduct();
  const [products, setProducts] = useState<Product[]>();

  const fetchProducts = async (categorySlug: string) => {
    const res = await fetchCategoryProducts(categorySlug, { limit: 9 });
    setProducts(res?.products);
  };

  useEffect(() => {
    fetchProducts("rearonova");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[50vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/images/hero/preowned-hero.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">
              Pre-Owned, Verified, and Loved.
            </h1>
            <p className="font-sans text-lg text-cream/90 max-w-2xl mx-auto">
              Aronova Resell gives luxury a second life. Each item is
              authenticated, restored, and documented — preserving the story
              behind every piece.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-16">
            How We Authenticate
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Authentication Guarantee
              </h3>
              <p className="text-muted-foreground">
                Every item undergoes rigorous verification by certified luxury
                authenticators.
              </p>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Provenance Certificate
              </h3>
              <p className="text-muted-foreground">
                Complete documentation of origin, ownership history, and
                condition reports.
              </p>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Sustainable Luxury
              </h3>
              <p className="text-muted-foreground">
                Extend the lifecycle of exceptional pieces while reducing
                environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Shop Pre-Owned</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="border-gold text-foreground hover:bg-gold/10"
              >
                Available Items
              </Button>
            </div>
          </div>

          {loading.category ? (
            <ApiLoader message="Loading pre-owned products..." />
          ) : (
            <Fragment>
              {products && products.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="group cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative aspect-4/5 mb-4 overflow-hidden rounded-lg bg-cream">
                        <img
                          src={product.images[0] || "/images/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-deep-green text-cream text-xs px-3 py-1 rounded-full font-sans">
                          ✓ Verified
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {product.merchant_store_name}
                      </p>
                      <h3 className="font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-sans font-semibold">
                        {product.pricing.final_price.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center col-span-3 text-muted-foreground">
                  No pre-owned products available at the moment.
                </div>
              )}
            </Fragment>
          )}
        </div>
      </section>

      {/* <section className="py-20 px-6 bg-cream">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-6">Sell Your Luxury Pieces</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Turn your pre-loved luxury items into value. Our authentication and
          consignment service ensures a seamless, transparent process.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
          <div>
            <div className="font-sans font-semibold text-gold mb-2">
              01. Submit
            </div>
            <p className="text-sm text-muted-foreground">
              Upload photos and details of your item through our secure
              portal.
            </p>
          </div>
          <div>
            <div className="font-sans font-semibold text-gold mb-2">
              02. Verify
            </div>
            <p className="text-sm text-muted-foreground">
              Our experts authenticate and appraise your piece within 48
              hours.
            </p>
          </div>
          <div>
            <div className="font-sans font-semibold text-gold mb-2">
              03. Sell
            </div>
            <p className="text-sm text-muted-foreground">
              Once listed, we handle marketing, sales, and secure payment.
            </p>
          </div>
        </div>
        <Button
          size="lg"
          className="bg-gold hover:bg-gold/90 text-foreground"
        >
          Start Selling
        </Button>
      </div>
    </section> */}
    </div>
  );
};

export default PreOwned;
