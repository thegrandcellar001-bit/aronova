"use client";

import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useCategoryStore } from "@/lib/stores/categories";
import { Fragment, useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";
import api from "@/lib/axios";
import { Product } from "@/types/product.types";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Filters from "../cat/[slug]/partials/filters";
import MobileFilters from "../cat/[slug]/partials/filters/MobileFilters";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProductResponse {
  limit: number;
  offset: number;
  total: number;
  products: Product[] | [];
}

interface CategoryMeta {
  offset: number;
  limit: number;
  total: number;
}

const Shop = () => {
  const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>();
  const { categories, fetchCategories, loading } = useCategoryStore();
  const [products, setProducts] = useState<Product[] | []>();
  const [productLoading, setProductLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<string | null>(
    categories.length > 0 ? categories[0].category_slug : null
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { toastError } = useToast();

  const fetchProducts = async (category_slug: string, page: number = 1) => {
    setProductLoading(true);

    try {
      const limit = categoryMeta?.limit || 20;
      const offset = (page - 1) * limit;

      const res = await api.get<ProductResponse>(
        `/categories/${category_slug}`,
        {
          params: { limit, offset },
        }
      );

      const { total, products } = res.data;
      setCategoryMeta({ limit, offset, total });
      setProducts(res.data.products);
      setCurrentPage(page);
      setCurrentCategory(category_slug);
    } catch (err) {
      console.error("Error fetching category products:", err);
      toastError("Failed to fetch category products.");
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts(categories[0].category_slug);
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
            <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.category_slug}
                      variant={category.name === "All" ? "default" : "ghost"}
                      size="sm"
                      className={`text-sm cursor-pointer ${
                        currentCategory === category.category_slug &&
                        "bg-secondary text-primary"
                      } hover:bg-secondary hover:text-primary`}
                      onClick={() => fetchProducts(category.category_slug)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-8 lg:py-10">
            {productLoading ? (
              <ApiLoader message="Loading products..." />
            ) : (
              <div className="max-w-[1400px] px-6 lg:px-20 flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-1/3">
                  {isDesktop ? <Filters /> : <MobileFilters />}
                </div>

                <div className="grow w-full">
                  <div className="mb-8">
                    {categoryMeta && (
                      <span className="text-sm md:text-base text-black/60 mr-3">
                        Showing {categoryMeta.offset + 1}–
                        {Math.min(
                          categoryMeta.offset + categoryMeta.limit,
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
                      {/* Load More */}
                      <div className="flex justify-center mt-16">
                        <Button variant="outline" size="lg" className="px-12">
                          Load More
                        </Button>
                      </div>
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
