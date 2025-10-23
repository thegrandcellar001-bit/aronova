"use client";

import ProductListSec from "@/components/common/ProductListSec";
import { Spinner } from "@/components/ui/spinner";
import AuthGuard from "@/lib/auth-guard";
import { useCategoryStore } from "@/lib/stores/categories";
import Link from "next/link";
import { useEffect } from "react";
import { newArrivalsData, topSellingData } from "@/lib/data/products";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import ApiLoader from "@/components/common/api-loader";

export default function Page() {
  const { categories, fetchCategories, loading } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <AuthGuard>
      <main className="pt-8 pb-20">
        <div className="max-w-frame mx-auto px-2">
          {loading ? (
            <ApiLoader message="Loading categories..." />
          ) : (
            <div className="flex flex-col gap-y-14 w-full">
              <div>
                <ProductListSec
                  title="NEW ARRIVALS"
                  data={newArrivalsData}
                  viewAllLink="/shop#new-arrivals"
                />
              </div>

              <div>
                <ProductListSec
                  title="top selling"
                  data={topSellingData}
                  viewAllLink="/shop#top-selling"
                />
              </div>

              <div className="flex flex-col gap-y-5 px-4 md:px-0">
                <h2
                  className={cn([
                    integralCF.className,
                    "text-3xl md:text-4xl mb-6 capitalize",
                  ])}
                >
                  Shop by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      className="flex flex-col items-center justify-center gap-4 border border-gray-500 p-4 hover:shadow-md cursor-pointer h-[170px] w-full flex-1"
                      href={`/cat/${category.category_slug}`}
                    >
                      <i className="fal fa-box text-gray-600 text-5xl"></i>
                      <span className="text-md font-medium text-center">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
