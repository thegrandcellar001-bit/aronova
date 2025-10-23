"use client";

import BreadcrumbShop from "./partials/shop-breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "./partials/filters/MobileFilters";
import Filters from "./partials/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
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
import ShopCategories from "./partials/shop-categories";
import { useCategoryStore } from "@/lib/stores/categories";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import ApiLoader from "@/components/common/api-loader";
import { Product } from "@/types/product.types";
import { getVisiblePages } from "@/lib/utils";

interface CategoryMeta {
  offset: number;
  limit: number;
  total: number;
}

export default function ShopPage() {
  const params = useParams<{ slug: string }>();
  const { findCategoryBySlug } = useCategoryStore();
  const categoryData = findCategoryBySlug(params.slug);

  const { toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [categoryMeta, setCategoryMeta] = useState<CategoryMeta>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  if (!categoryData) {
    return <div className="p-4">Category not found.</div>;
  }

  const fetchProducts = async (page = 1) => {
    setLoading(true);

    try {
      const limit = categoryMeta?.limit || 20;
      const offset = (page - 1) * limit;

      const res = await api.get(`/categories/${params.slug}`, {
        params: { limit, offset },
      });

      const { total, products } = res.data;
      setCategoryMeta({ limit, offset, total });
      setCategoryProducts(products);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching category products:", error);
      toastError("Failed to fetch category products.");
    } finally {
      setLoading(false);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = categoryMeta
    ? Math.ceil(categoryMeta.total / categoryMeta.limit)
    : 1;
  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
    isMobile ? 3 : 5
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [params.slug]);

  return (
    <AuthGuard>
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <ShopCategories />
          <BreadcrumbShop category={categoryData} />
          <div className="flex md:space-x-5 items-start">
            <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black text-xl">Filters</span>
                <FiSliders className="text-2xl text-black/40" />
              </div>
              <Filters />
            </div>
            <div className="flex flex-col w-full space-y-5">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-2xl md:text-[32px]">
                    {categoryData.name}
                  </h1>
                  <MobileFilters />
                </div>
                {categoryProducts && categoryProducts.length > 0 && (
                  <div className="flex flex-col sm:items-center sm:flex-row">
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
                    <div className="flex items-center">
                      Sort by:{" "}
                      <Select defaultValue="most-popular">
                        <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="most-popular">
                            Most Popular
                          </SelectItem>
                          <SelectItem value="low-price">Low Price</SelectItem>
                          <SelectItem value="high-price">High Price</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Category Products */}
              {loading ? (
                <div className="h-full">
                  <ApiLoader message="Loading products..." />
                </div>
              ) : (
                <>
                  {categoryProducts && categoryProducts.length > 0 ? (
                    <>
                      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {categoryProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            categorySlug={params.slug}
                            data={product}
                          />
                        ))}
                      </div>
                      {/* Pagination */}
                      <hr className="border-t-black/10" />
                      <Pagination className="justify-between">
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) fetchProducts(currentPage - 1);
                          }}
                          className={`border border-black/10 ${
                            currentPage === 1
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }`}
                          size="sm"
                        />

                        <PaginationContent>
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .slice(0, 5) // show only first 5 pages for now (can make dynamic)
                            .map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fetchProducts(page);
                                  }}
                                  className={`text-sm font-medium ${
                                    page === currentPage
                                      ? "text-black font-semibold"
                                      : "text-black/50"
                                  }`}
                                  isActive={page === currentPage}
                                  size="sm"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                          {totalPages > 5 && (
                            <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                          )}
                        </PaginationContent>

                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              fetchProducts(currentPage + 1);
                          }}
                          className={`border border-black/10 ${
                            currentPage === totalPages
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }`}
                          size="sm"
                        />
                      </Pagination>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-y-3 w-full py-12">
                      <i className="fal fa-box text-4xl"></i>
                      <p className="text-black/40">
                        No products yet in this category.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
