"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbOrder from "../partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ApiLoader from "@/components/common/api-loader";
import { useApi } from "@/hooks/use-api";

interface ReviewItems {
  product_id: string;
  product_name: string;
  image_url: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
}

export default function Page() {
  const { user } = useAuthStore();
  const { toastError } = useToast();
  const {
    data: reviews,
    loading,
    execute: fetchReviews,
  } = useApi<ReviewItems[]>("/reviews", "GET", []);

  useEffect(() => {
    fetchReviews().catch((error) => {
      console.error("Error fetching reviews:", error);
      toastError("Failed to fetch reviews. Please try again later.");
    });
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10 bg-white">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder
            subLink={{ title: "Reviews", path: "/orders/reviews" }}
          />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            {loading ? (
              <ApiLoader message="Loading your reviews..." />
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                {!reviews || !reviews.length ? (
                  <div className="text-center text-muted-foreground mt-20">
                    <h2 className="text-2xl font-semibold mb-4">
                      You have no orders to review yet.
                    </h2>
                    <p className="mb-6">
                      Once you have purchased products, you can leave reviews
                      here.
                    </p>
                    <Link href="/shop">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-4 flex-1">
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Your Reviews
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {reviews.length}{" "}
                        {reviews.length === 1 ? "review" : "reviews"}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {reviews?.map((review, index) => (
                        <div
                          key={index}
                          className="bg-white border p-6 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex gap-5">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={review.image_url}
                                  alt={review.product_name}
                                  className="object-cover"
                                  fill
                                  sizes="96px"
                                />
                              </div>
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 min-w-0">
                              {/* Product Name */}
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                <Link href={`/item/${review.product_id}`}>
                                  {review.product_name}
                                </Link>
                              </h3>

                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center text-xl">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>
                                      <i
                                        className={`fas fa-star text-lg ${
                                          i < review.rating
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      ></i>
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Review Comment */}
                              <div className="mb-3">
                                <p className="text-gray-700 leading-relaxed">
                                  {review.comment}
                                </p>
                              </div>

                              {/* Review Date */}
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <i className="far fa-calendar text-md" />
                                <span>
                                  {new Date(
                                    review.created_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
