"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbOrder from "../partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ApiLoader from "@/components/common/api-loader";

interface OrderItems {
  name: string;
  image_url: string;
  product_id?: string;
  quantity?: number;
  price?: number;
}

interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  payment_status: string;
  order_items: OrderItems[];
  created_at: string;
}

interface ReviewItems {
  product_id: string;
  product_name: string;
  product_image_url: string;
  category_slug: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
}

interface ReviewResponse {
  order_id: number;
  order_created_at: string;
  user_id: number;
  reviews: ReviewItems[];
}

export default function Page() {
  const { user } = useAuthStore();
  const { toastError } = useToast();
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toastError("Failed to fetch reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // setTimeout(() => {
    //   setLoading(false);
    //   setReviews([]);
    // }, 1500);
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
                {!reviews.length ? (
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
                  <div className="flex flex-col gap-y-6">
                    {reviews.map((reviewResp, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md mt-4 flex flex-col gap-y-4"
                      >
                        <div className="flex items-center gap-x-4">
                          <Image
                            src={reviewResp.reviews[0]?.product_image_url || ""}
                            alt={reviewResp.reviews[0]?.product_name || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-1.5">
                            {reviewResp.reviews[0]?.product_name}
                            <div className="text-sm text-muted-foreground">
                              Order No: {reviewResp.order_id}
                            </div>
                            <div>On: {reviewResp.order_created_at}</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <h3 className="font-semibold text-lg">
                            Your Reviews:
                          </h3>
                          {reviewResp.reviews.map((review, revIndex) => (
                            <div key={revIndex} className="border-t pt-2 mt-2">
                              <div className="flex items-center gap-x-2">
                                <span className="font-medium">
                                  {review.product_name}
                                </span>
                                <Badge variant="default" className="text-sm">
                                  {review.rating} / 5
                                </Badge>
                              </div>
                              <p className="mt-1">{review.comment}</p>
                              <div className="text-sm text-muted-foreground">
                                Reviewed on:{" "}
                                {new Date(
                                  review.created_at
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
