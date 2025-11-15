"use client";

import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/lib/stores/categories";
import { Fragment, useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";
import { Product } from "@/types/product.types";
import Link from "next/link";
import Filters from "../cat/[slug]/partials/filters";
import MobileFilters from "../cat/[slug]/partials/filters/MobileFilters";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProduct } from "../providers/product-provider";

interface ProductResponse {
  limit: number;
  offset: number;
  total: number;
  products: Product[] | [];
}

interface CategoryMeta {
  page: number;
  limit: number;
  total: number;
}

const Shop = () => {
  const {
    fetchFilteredProducts,
    loading: { filter: productLoading },
  } = useProduct();

  const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>();
  const { categories, fetchCategories, loading } = useCategoryStore();
  const [products, setProducts] = useState<Product[] | []>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<string | null>(
    categories.length > 0 ? categories[0].category_slug : null
  );

  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    colors: [] as string[],
    sizes: [] as string[],
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const fetchProducts = async (
    category_slug: string,
    page: number = 1,
    filters: any
  ) => {
    const limit = categoryMeta?.limit || 20;
    const params: any = { category_slug, limit, page };

    if (filters) {
      if (filters.colors.length > 0) params.color = filters.colors;
      if (filters.sizes.length > 0) params.size = filters.sizes;
      if (filters.priceRange) {
        params.min_price = filters.priceRange[0];
        params.max_price = filters.priceRange[1];
      }
    }

    const response = await fetchFilteredProducts(params);
    const { total, products } = response || { total: 0, products: [] };

    setCategoryMeta({ limit, page, total });
    setProducts(products);
    setCurrentPage(page);
    setCurrentCategory(category_slug);
  };

  const handleApplyFilters = () => {
    if (currentCategory) {
      fetchProducts(currentCategory, 1, filters);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts(categories[0].category_slug, 1, filters);
    }
  }, [categories]);

  return (
    <div className="min-h-screen bg-background">
      {loading ? (
        <ApiLoader message="Loading products..." />
      ) : (
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-20 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
              <h1 className="text-5xl lg:text-6xl mb-6 animate-fade-in">
                The Market
              </h1>
              <p className="font-sans text-lg text-primary-foreground/90 max-w-2xl animate-fade-in-slow">
                Discover exceptional pieces from Nigeria's most celebrated
                artisans and luxury brands.
              </p>
            </div>
          </section>
          {/* Filter Bar */}
          <section className="border-b border-border bg-background sticky top-20 z-40">
            <div className="max-w-[1400px] mx-auto px-2 lg:px-20 py-6">
              <div className="flex items-center gap-4 w-[95%]">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="relative w-full"
                >
                  <div className="bg-background w-[34px] h-9 absolute left-0 top-0 bottom-0 flex items-center justify-center z-10">
                    <CarouselPrevious className="absolute left-0 z-10 inline-flex rounded-none cursor-pointer bg-primary text-white" />
                  </div>
                  <CarouselContent className="ml-7">
                    {categories.map((category) => (
                      <CarouselItem
                        key={category.category_slug}
                        className="basis-auto shrink-0"
                      >
                        <Button
                          variant={
                            category.name === "All" ? "default" : "outline"
                          }
                          size="sm"
                          className={`text-sm cursor-pointer whitespace-nowrap ${
                            currentCategory === category.category_slug &&
                            "bg-primary text-white"
                          } border-[1.5px] border-deep-green hover:bg-primary hover:text-white`}
                          onClick={() =>
                            fetchProducts(category.category_slug, 1, filters)
                          }
                        >
                          {category.name}
                        </Button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="absolute inline-flex cursor-pointer rounded-none bg-primary text-white" />
                </Carousel>
              </div>
            </div>
          </section>
          {/* Products Grid */}
          <section className="py-8 lg:py-10 bg-white">
            {productLoading ? (
              <ApiLoader message="Loading products..." />
            ) : (
              <div className="max-w-[1400px] px-6 lg:px-20 flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-1/3">
                  {isDesktop ? (
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                      onApply={handleApplyFilters}
                    />
                  ) : (
                    <MobileFilters
                      filters={filters}
                      setFilters={setFilters}
                      onApply={handleApplyFilters}
                    />
                  )}
                </div>

                <div className="grow w-full">
                  <div className="mb-8">
                    {categoryMeta && (
                      <span className="text-sm md:text-base text-black/60 mr-3">
                        Showing {categoryMeta.page}–
                        {Math.min(
                          categoryMeta.page + categoryMeta.limit,
                          categoryMeta.total
                        )}{" "}
                        of {categoryMeta.total} products
                      </span>
                    )}
                  </div>
                  {/* Products */}
                  {products && products.length > 0 ? (
                    <Fragment>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/cat/${product.category_slug}/${product.id}`}
                          >
                            <div className="group cursor-pointer animate-fade-in">
                              <div className="relative aspect-3/4 mb-4 overflow-hidden bg-muted">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              </div>
                              <div className="space-y-1">
                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                                  {product.merchant_store_name}
                                </p>
                                <h3 className="font-sans text-base text-foreground group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <div className="flex items-center space-x-[5px] xl:space-x-2.5">
                                  {product.pricing.discount > 0 ? (
                                    <span className="text-black text-xl xl:text-2xl">
                                      ₦
                                      {product.pricing.final_price.toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className="text-black text-xl xl:text-2xl">
                                      ₦
                                      {product.pricing.base_price.toLocaleString()}
                                    </span>
                                  )}
                                  {product.pricing.discount > 0 && (
                                    <span className="text-black/40 line-through text-xl xl:text-2xl">
                                      ₦
                                      {product.pricing.base_price.toLocaleString()}
                                    </span>
                                  )}
                                  {product.pricing.discount > 0 && (
                                    <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                                      {`-${product.pricing.discount}%`}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {categoryMeta &&
                        categoryMeta.total >
                          categoryMeta.limit * currentPage && (
                          <div className="flex justify-center mt-16">
                            <Button
                              variant="outline"
                              size="lg"
                              className="px-12"
                            >
                              Load More
                            </Button>
                          </div>
                        )}
                    </Fragment>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-y-3 w-full py-12">
                      <i className="fal fa-box text-4xl"></i>
                      <p className="text-black/40">
                        No products yet in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
};

export default Shop;
