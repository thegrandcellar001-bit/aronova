"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbReview from "./partials/review-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import api from "@/lib/axios";
import { Fragment, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { formatDate } from "@/lib/utils";
import { Review } from "@/types/review.types";
import ApiLoader from "@/components/common/api-loader";
import { useApi } from "@/hooks/use-api";

interface OrderItems {
  name: string;
  image_url: string;
  product_id: number;
  quantity: number;
  price: number;
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

export default function Page() {
  const { user } = useAuthStore();
  const params = useParams<{ id: string }>();
  const { toastSuccess, toastError } = useToast();
  const [review, setReview] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const userName = user.name ?? "";

  const {
    data: order,
    loading,
    execute: fetchOrder,
  } = useApi<Order>(`/orders/${params.id}`);
  const { execute: submitReview } = useApi("/review", "POST");

  const fetchReviews = async (product_id: number) => {
    try {
      const res = await api.get(`/${product_id}/reviews`);
      setReview(
        res.data.filter((review: Review) => review.user_name === userName)
      );
    } catch (error) {
      console.error("Error fetching review:", error);
      toastError("Failed to fetch review. Please try again later.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const ratingValue = formData.get("rating");
    const rating = ratingValue ? parseInt(String(ratingValue), 10) : 0;
    const reviewValue = formData.get("review");
    const reviewText = reviewValue ? String(reviewValue) : "";

    try {
      const res = await submitReview({
        data: {
          product_id: order?.order_items[0].product_id,
          rating,
          comment: reviewText,
        },
      });
      setReview([res]);
      toastSuccess("Review submitted successfully.");
    } catch (error) {
      console.error("Error submitting review:", error);
      toastError("Failed to submit review. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchOrder()
      .then((data) => {
        if (data?.order_items?.[0]?.product_id) {
          fetchReviews(data.order_items[0].product_id);
        }
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        toastError("Failed to fetch order. Please try again later.");
      });
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbReview />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            {loading ? (
              <ApiLoader message="Loading order..." />
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                {!order ? (
                  <div className="flex flex-col gap-y-6 items-center text-center text-muted-foreground mt-20">
                    <i className="far fa-star text-6xl"></i>
                    No review found.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {order.status.toLowerCase() === "completed" ? (
                      <>
                        <div
                          key={order.id}
                          className="border p-4 rounded-md flex items-center gap-x-4"
                        >
                          <Image
                            src={order.order_items[0]?.image_url || ""}
                            alt={order.order_items[0]?.name || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-2">
                            <div className="text-lg">
                              <Link
                                href={`/cat/${order.order_items[0]?.name}/${order.order_items[0]?.product_id}`}
                              >
                                {order.order_items[0]?.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                Order No: {order.id}
                              </p>
                            </div>

                            <div className="text-sm text-muted-foreground">
                              <Badge className="rounded-sm font-semibold">
                                {order.status?.toUpperCase()}
                              </Badge>
                            </div>
                            <div>On: {formatDate(order.created_at)}</div>
                          </div>
                          {order.status.toLowerCase() === "completed" && (
                            <div className="ml-auto self-start">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    className="text-sm font-medium rounded-md cursor-pointer"
                                    variant="ghost"
                                  >
                                    <i className="fas fa-ellipsis"></i>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    className="cursor-pointer py-2 flex items-center gap-x-2"
                                    asChild
                                  >
                                    <Link
                                      href={`/account/orders/${order.id}/dispute`}
                                    >
                                      <i className="far fa-flag"></i> Create
                                      dispute
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer py-2 flex items-center gap-x-2"
                                    asChild
                                  >
                                    <Link
                                      href={`/account/orders/${order.id}/return`}
                                    >
                                      <i className="far fa-box"></i>
                                      Return this item
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </div>

                        {review && review.length > 0 ? (
                          <Fragment>
                            {review.map((review, index) => (
                              <div className="mt-2 mb-6" key={index}>
                                <h3 className="text-lg font-semibold">
                                  Your Review
                                </h3>
                                <div className="mt-2 border p-4 rounded-md">
                                  <div className="flex items-center mb-2">
                                    <span className="font-bold text-yellow-500 mr-2">
                                      {"⭐".repeat(review.rating)}
                                    </span>
                                  </div>
                                  <p className="text-md">{review.comment}</p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    Reviewed on {formatDate(review.created_at)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </Fragment>
                        ) : (
                          <div className="mt-2 mb-6">
                            <h3 className="text-lg font-semibold">
                              Write a review
                            </h3>
                            <form
                              className="flex flex-col gap-y-4 mt-4"
                              onSubmit={handleReviewSubmit}
                            >
                              <div>
                                <label className="block mb-2 font-medium">
                                  Select rating
                                </label>
                                <Select name="rating" required>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select rating" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="5">
                                      5 - Excellent (⭐⭐⭐⭐⭐)
                                    </SelectItem>
                                    <SelectItem value="4">
                                      4 - Good (⭐⭐⭐⭐)
                                    </SelectItem>
                                    <SelectItem value="3">
                                      3 - Average (⭐⭐⭐)
                                    </SelectItem>
                                    <SelectItem value="2">
                                      2 - Poor (⭐⭐)
                                    </SelectItem>
                                    <SelectItem value="1">
                                      1 - Terrible (⭐)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <label className="block mb-2 font-medium">
                                  Your review
                                </label>
                                <Textarea
                                  className="w-full border rounded-md p-2"
                                  rows={4}
                                  placeholder="Write your review here..."
                                  name="review"
                                  required
                                />
                              </div>
                              <Button
                                type="submit"
                                className="w-fit cursor-pointer"
                              >
                                Submit Review
                              </Button>
                            </form>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col gap-y-6 items-center text-center text-muted-foreground mt-20">
                        <i className="fal fa-star text-6xl" />
                        Review option is available only after delivery.
                      </div>
                    )}
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
