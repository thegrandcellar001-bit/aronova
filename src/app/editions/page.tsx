"use client";

import Navigation from "../partials/home/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useProduct } from "../providers/product-provider";
import { Fragment, useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import Link from "next/link";
import ApiLoader from "@/components/common/api-loader";

const Editions = () => {
  const { loading, fetchCategoryProducts } = useProduct();
  const [products, setProducts] = useState<Product[]>();

  const fetchProducts = async (categorySlug: string) => {
    const res = await fetchCategoryProducts(categorySlug, { limit: 3 });
    setProducts(res?.products);
  };

  useEffect(() => {
    fetchProducts("editions");
  }, []);

  // const editions = [
  //   {
  //     id: 1,
  //     image: "/images/products/product-1.jpg",
  //     title: "Heritage Collection 2025",
  //     description:
  //       "A curated selection celebrating Nigeria's textile heritage with contemporary interpretations.",
  //     pieces: "Limited to 50 pieces",
  //     status: "Available Now",
  //     price: "From ₦450,000",
  //   },
  //   {
  //     id: 2,
  //     image: "/images/products/product-2.jpg",
  //     title: "Artisan Collaboration Series",
  //     description:
  //       "Exclusive pieces co-created with master craftspeople from across Nigeria.",
  //     pieces: "Limited to 30 pieces",
  //     status: "Pre-Order",
  //     price: "From ₦680,000",
  //   },
  //   {
  //     id: 3,
  //     image: "/images/products/product-3.jpg",
  //     title: "Contemporary Lagos",
  //     description:
  //       "Modern luxury pieces inspired by the vibrant energy of Lagos.",
  //     pieces: "Limited to 75 pieces",
  //     status: "Coming Soon",
  //     price: "From ₦320,000",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-7xl mb-8 animate-fade-in">
                Curated Editions
              </h1>
              <p className="font-sans text-lg lg:text-xl text-primary-foreground/90 mb-8 animate-fade-in-slow">
                Each edition is a carefully curated collection that tells a
                story of Nigerian craftsmanship, heritage, and contemporary
                luxury. Every piece is numbered, authenticated, and comes with
                provenance documentation.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 animate-scale-in bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-primary"
                asChild
              >
                <Link href="/cat/editions">
                  View All Collections
                  <i className="far fa-arrow-right text-md" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Editions Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            {loading.category ? (
              <ApiLoader message="Loading editions..." />
            ) : (
              <Fragment>
                {products && products.length > 0 ? (
                  <div className="space-y-32">
                    {products.map((edition, index) => (
                      <div
                        key={edition.id}
                        className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                          index % 2 === 1 ? "lg:grid-flow-dense" : ""
                        }`}
                      >
                        <div
                          className={`${
                            index % 2 === 1 ? "lg:col-start-2" : ""
                          } animate-fade-in`}
                        >
                          <div className="aspect-4/5 overflow-hidden bg-muted">
                            <img
                              src={
                                edition.images[0] || "/images/placeholder.png"
                              }
                              alt={edition.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        </div>

                        <div
                          className={`${
                            index % 2 === 1
                              ? "lg:col-start-1 lg:row-start-1"
                              : ""
                          } space-y-6 animate-fade-in-slow`}
                        >
                          <div className="inline-block px-4 py-2 border border-gold text-gold text-xs font-sans tracking-[0.2em] uppercase">
                            Available
                          </div>
                          <h2 className="text-3xl lg:text-4xl text-foreground">
                            {edition.name}
                          </h2>
                          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                            {edition.description}
                          </p>
                          <div className="space-y-3 pt-4">
                            <p className="font-sans text-sm text-foreground">
                              <span className="text-muted-foreground">
                                Edition Size:
                              </span>{" "}
                              {edition.inventory.available} pieces
                            </p>
                            <p className="font-sans text-xl font-semibold text-foreground">
                              {edition.pricing.final_price.toLocaleString(
                                "en-NG",
                                {
                                  style: "currency",
                                  currency: "NGN",
                                }
                              )}
                            </p>
                          </div>
                          <div className="pt-4">
                            <Button className="gap-2" asChild>
                              <Link href={`/cat/editions/${edition.id}`}>
                                Explore Collection
                                <i className="far fa-arrow-right text-md" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-y-3 w-full py-12">
                    <i className="fal fa-box text-4xl"></i>
                    <p className="text-black/40">
                      No editions available at the moment.
                    </p>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-muted py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-4xl lg:text-5xl mb-6 text-foreground">
              Be First to Know
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to receive early access to new editions and exclusive
              pre-order opportunities.
            </p>
            <Button size="lg" className="gap-2">
              Join Our Circle
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Editions;
