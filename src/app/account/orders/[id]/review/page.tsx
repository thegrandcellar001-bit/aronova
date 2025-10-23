"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbReview from "./partials/review-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
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
  const params = useParams<{ id: string }>();
  const { toastSuccess, toastError } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [review, setReview] = useState<any>(null);

  const order = {
    id: 386285731,
    created_at: "2025-09-10",
    status: "delivered",
    order_items: [
      {
        name: "Color Screen Smart Bracelet D13 Waterproof Bracelet Waterproof",
        image_url: "/images/orders/2.jpg",
      },
    ],
  };

  const fetchReview = async () => {
    try {
      const res = await api.get(`/review/${params.id}/`);
      setReview(res.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      toastError("Failed to fetch review. Please try again later.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const rating = formData.get("rating");
    const reviewText = formData.get("review");

    try {
      const res = await api.post(`/review`, {
        product_id: params.id,
        rating,
        comment: reviewText,
      });
      toastSuccess("Review submitted successfully.");
    } catch (error) {
      console.error("Error submitting review:", error);
      toastError("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchReview();
  }, []);

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbReview />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {!order ? (
                <div className="text-center text-muted-foreground mt-20">
                  No review found.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {order.status === "delivered" ? (
                    <>
                      <div
                        key={order.id}
                        className="border p-4 rounded-md mt-4 flex items-center gap-x-4"
                      >
                        <Image
                          src={order.order_items[0]?.image_url || ""}
                          alt={order.order_items[0]?.name || ""}
                          className="rounded-lg"
                          width={110}
                          height={110}
                        />
                        <div className="space-y-1.5">
                          {order.order_items[0]?.name}
                          <div className="text-sm text-muted-foreground">
                            Order No: {order.id}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <Badge
                              variant={
                                order.status === "delivered" ||
                                order.status === "shipped"
                                  ? "secondary"
                                  : "default"
                              }
                              className={`rounded-sm font-semibold ${
                                order.status === "delivered" ||
                                order.status === "shipped"
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              {order.status?.toUpperCase()}
                            </Badge>
                          </div>
                          <div>On: {order.created_at}</div>
                        </div>
                        {order.status === "delivered" && (
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
                                  className="cursor-pointer py-2"
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
                                  className="cursor-pointer py-2"
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

                      {review ? (
                        <div className="mt-2 mb-6">
                          <h3 className="text-lg font-semibold">Your Review</h3>
                          <div className="mt-2 border p-4 rounded-md">
                            <div className="flex items-center mb-2">
                              <span className="font-bold text-yellow-500 mr-2">
                                {"⭐".repeat(review.rating)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {review.rating} out of 5
                              </span>
                            </div>
                            <p className="text-sm">{review.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Reviewed on:{" "}
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
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
                              <label className="block mb-1 font-medium">
                                Your Rating
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
                              <label className="block mb-1 font-medium">
                                Your Review
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
                    <div className="text-center text-muted-foreground mt-20">
                      Review option is available only after delivery.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
