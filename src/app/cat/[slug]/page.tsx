"use client";

import BreadcrumbShop from "./partials/shop-breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AuthGuard from "@/lib/auth-guard";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";
import { Product } from "@/types/product.types";
import { getVisiblePages } from "@/lib/utils";
import { useProduct } from "@/app/providers/product-provider";
import Filters from "./partials/filters";
import MobileFilters from "./partials/filters/MobileFilters";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCategories } from "@/app/providers/category-provider";

interface CategoryMeta {
  offset: number;
  limit: number;
  total: number;
}

export default function ShopPage() {
  const params = useParams<{ slug: string }>();
  const currentCategory = params.slug;

  const { categories, findCategoryBySlug } = useCategories();
  const categoryData = findCategoryBySlug(params.slug);

  const { fetchCategoryProducts, loading } = useProduct();

  const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryData, setCurrentCategoryData] = useState<any>(
    categories.find((cat) => cat.category_slug === currentCategory)
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    colors: [] as string[],
    sizes: [] as string[],
    sort_by: "rating",
  });

  const fetchProducts = async (
    page = 1,
    categorySlug: string,
    sortOverride?: string,
    skipPrice: boolean = false
  ) => {
    const limit = categoryMeta?.limit || 20;
    const offset = (page - 1) * limit;

    const query: any = { slug: categorySlug, limit, offset };

    if (filters.colors.length > 0) query.color = filters.colors;
    if (filters.sizes.length > 0) query.size = filters.sizes;

    if (!skipPrice && filters.priceRange) {
      query.min_price = filters.priceRange[0];
      query.max_price = filters.priceRange[1];
    }
    query.sort_by = sortOverride ?? filters.sort_by;

    const response = await fetchCategoryProducts(categorySlug, query);
    const { total, products } = response || { total: 0, products: [] };

    setCategoryMeta({ limit, offset, total });
    setCategoryProducts(products);
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = categoryMeta
    ? Math.ceil(categoryMeta.total / categoryMeta.limit)
    : 1;

  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
    isDesktop ? 5 : 3
  );

  useEffect(() => {
    fetchProducts(1, params.slug, undefined, true);
  }, [params.slug]);

  const handleApplyFilters = () => {
    fetchProducts(1, params.slug);
  };

  const handleSort = (value: string) => {
    setFilters((prev) => ({ ...prev, sort_by: value }));

    // pass the new value directly
    fetchProducts(1, params.slug, value);
  };

  return (
    <AuthGuard>
      <main className="pt-26 bg-white pb-10">
        {!categoryData ? (
          <div className="h-96 flex flex-col gap-y-6 items-center justify-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100">
              <i className="fal fa-folder-open text-6xl text-gray-400" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Category Not Found
              </h3>
              <p className="text-gray-500">
                The category you're looking for doesn't exist.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <BreadcrumbShop category={categoryData} />
            <div
              className={`flex ${
                !isDesktop ? "flex-col space-y-5" : "gap-x-6"
              } items-start`}
            >
              <div>
                {isDesktop && (
                  <div className="min-w-[295px] max-w-[295px] bg-white border p-6 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiSliders className="text-primary" />
                      </div>
                      <span className="font-semibold text-xl text-gray-900">
                        Filters
                      </span>
                    </div>
                    <Filters
                      categories={categories}
                      categoryData={currentCategoryData}
                      filters={filters}
                      setFilters={setFilters}
                      onApply={handleApplyFilters}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full space-y-5">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="mb-6">
                    <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
                      {categoryData.name}
                    </h1>
                  </div>
                  {categoryProducts && categoryProducts.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 border border-gray-200 p-4">
                      {categoryMeta && (
                        <span className="text-sm text-gray-600">
                          Showing{" "}
                          <span className="font-semibold text-gray-900">
                            {categoryMeta.offset + 1}–
                            {Math.min(
                              categoryMeta.offset + categoryMeta.limit,
                              categoryMeta.total
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-semibold text-gray-900">
                            {categoryMeta.total}
                          </span>{" "}
                          products
                        </span>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Sort by:
                          </span>
                          <Select
                            value={filters.sort_by}
                            onValueChange={handleSort}
                          >
                            <SelectTrigger className="font-medium text-sm h-10 w-[180px] bg-white">
                              <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">
                                Most Popular
                              </SelectItem>
                              <SelectItem value="newest">
                                New Arrivals
                              </SelectItem>
                              <SelectItem value="oldest">Oldest</SelectItem>
                              <SelectItem value="name">
                                Name (ascending)
                              </SelectItem>
                              <SelectItem value="name_desc">
                                Name (descending)
                              </SelectItem>
                              <SelectItem value="price_desc">
                                Price (Low to High)
                              </SelectItem>
                              <SelectItem value="price">
                                Price (High to Low)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {!isDesktop && (
                          <MobileFilters
                            categories={categories}
                            categoryData={currentCategoryData}
                            filters={filters}
                            setFilters={setFilters}
                            onApply={handleApplyFilters}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Products */}
                {loading.category ? (
                  <div className="h-full">
                    <ApiLoader message="Loading products..." />
                  </div>
                ) : (
                  <>
                    {categoryProducts && categoryProducts.length > 0 ? (
                      <>
                        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mt-6">
                          {categoryProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                        {/* Pagination */}
                        <hr className="border-gray-200 my-6" />
                        <Pagination className="justify-between mt-6">
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1)
                                fetchProducts(
                                  currentPage - 1,
                                  params.slug,
                                  undefined,
                                  true
                                );
                            }}
                            className={`border hover:bg-gray-50 ${
                              currentPage === 1
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                            size="default"
                          />

                          <PaginationContent>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .slice(0, 5)
                              .map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      fetchProducts(
                                        page,
                                        params.slug,
                                        undefined,
                                        true
                                      );
                                    }}
                                    className={`border ${
                                      page === currentPage
                                        ? "border-primary bg-primary text-white font-semibold"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                                    isActive={page === currentPage}
                                    size="default"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}

                            {totalPages > 5 && (
                              <PaginationEllipsis className="text-gray-500" />
                            )}
                          </PaginationContent>

                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages)
                                fetchProducts(
                                  currentPage + 1,
                                  params.slug,
                                  undefined,
                                  true
                                );
                            }}
                            className={`border hover:bg-gray-50 ${
                              currentPage === totalPages
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                            size="default"
                          />
                        </Pagination>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-y-6 w-full py-20">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100">
                          <i className="fal fa-box text-6xl text-gray-400"></i>
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No Products Found
                          </h3>
                          <p className="text-gray-500 max-w-md">
                            There are no products in this category yet. Check
                            back soon!
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </AuthGuard>
  );
}
