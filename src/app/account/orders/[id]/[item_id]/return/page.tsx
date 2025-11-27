"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbDispute from "./partials/return-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
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
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import ApiLoader from "@/components/common/api-loader";

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
  const params = useParams<{ id: string; item_id: string }>();
  const { toastSuccess, toastError } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    data: order,
    loading: orderLoading,
    execute: fetchOrder,
  } = useApi<Order>(`/orders/${params.id}`);
  const {
    data: returnRequest,
    loading: returnLoading,
    execute: fetchReturn,
  } = useApi<any>(`/return-requests/order-item/${params.item_id}`);
  const { execute: submitReturn } = useApi("/return-requests", "POST");

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const reason = formData.get("reason");

    try {
      await submitReturn({
        data: {
          order_item_id: parseInt(params.item_id),
          reason,
        },
      });
      toastSuccess("Return submitted successfully.");
      fetchReturn(); // Refresh return data
    } catch (error) {
      console.error("Error submitting return:", error);
      toastError("Failed to submit return. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (params.id && params.item_id) {
      fetchOrder().catch((error) => {
        console.error("Error fetching order:", error);
        toastError("Failed to fetch order. Please try again later.");
      });
      fetchReturn().catch((error) => {
        console.error("Error fetching return:", error);
      });
    }
  }, [params.id, params.item_id]);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbDispute />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            {orderLoading ? (
              <ApiLoader message="Loading order details..." />
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                {!order ? (
                  <div className="flex flex-col items-center justify-center mt-20 px-4">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                      <i className="fas fa-info-circle text-4xl text-muted-foreground"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Return Not Available
                    </h2>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      Returns are only available for orders that have been
                      delivered. Please check back after your order is
                      delivered.
                    </p>
                    <Link href="/account/orders">
                      <Button className="gap-2">
                        <i className="fas fa-arrow-left"></i>
                        Back to Orders
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {returnRequest ? (
                      <>
                        {/* Order Summary Card */}
                        <div className="border rounded-lg shadow-sm bg-card overflow-hidden">
                          <div className="bg-muted/30 px-6 py-4 border-b">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-3">
                                <i className="fas fa-receipt text-muted-foreground"></i>
                                <div>
                                  <span className="font-semibold text-foreground">
                                    Order #{order.id}
                                  </span>
                                  <span className="text-sm text-muted-foreground ml-3">
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                              <Badge className="rounded-sm font-semibold">
                                {order.status?.toUpperCase()}
                              </Badge>
                            </div>
                          </div>

                          {/* Product Display */}
                          <div className="px-6 py-5 border-b bg-background">
                            <div className="flex items-start gap-4">
                              <Image
                                src={order.order_items[0]?.image_url || ""}
                                alt={order.order_items[0]?.name || ""}
                                className="rounded-lg object-cover border"
                                width={120}
                                height={120}
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground text-xl mb-2">
                                  {order.order_items[0]?.name}
                                </h3>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <i className="far fa-calendar"></i>
                                    <span>
                                      Ordered:{" "}
                                      {new Date(
                                        order.created_at
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-auto self-start">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      className="text-sm font-medium rounded-md cursor-pointer"
                                      variant="ghost"
                                      size="icon"
                                    >
                                      <i className="fas fa-ellipsis"></i>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      className="cursor-pointer py-2"
                                      asChild
                                    >
                                      <Link
                                        href={`/account/orders/${order.id}/review`}
                                      >
                                        <i className="far fa-star mr-2"></i>{" "}
                                        Write a review
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer py-2"
                                      asChild
                                    >
                                      <Link
                                        href={`/account/orders/${order.id}/dispute`}
                                      >
                                        <i className="far fa-flag mr-2"></i>
                                        Create dispute
                                      </Link>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>

                          {/* Return Request Details */}
                          <div className="px-6 py-5">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                              <i className="fas fa-undo-alt text-primary"></i>
                              Return Request Details
                            </h3>
                            <div className="space-y-4 bg-muted/20 rounded-lg p-4 border">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <i className="fas fa-exclamation text-primary text-sm"></i>
                                </div>
                                <div className="flex-1">
                                  <span className="font-semibold text-foreground block mb-1">
                                    Reason
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {returnRequest.reason
                                      .split("_")
                                      .map(
                                        (word: string) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <i className="fas fa-info-circle text-primary text-sm"></i>
                                </div>
                                <div className="flex-1">
                                  <span className="font-semibold text-foreground block mb-1">
                                    Status
                                  </span>
                                  {returnRequest.status === "approved" ? (
                                    <Badge
                                      variant="default"
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      <i className="fas fa-check-circle mr-1"></i>
                                      Approved
                                    </Badge>
                                  ) : returnRequest.status === "rejected" ? (
                                    <Badge variant="destructive">
                                      <i className="fas fa-times-circle mr-1"></i>
                                      Rejected
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="secondary"
                                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                    >
                                      <i className="fas fa-clock mr-1"></i>
                                      Pending Review
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="border rounded-lg shadow-sm bg-card overflow-hidden">
                        {/* Header */}
                        <div className="bg-muted/30 px-6 py-4 border-b">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <i className="fas fa-undo-alt text-primary"></i>
                            Request a Return
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Let us know why you'd like to return this order
                          </p>
                        </div>

                        {/* Form */}
                        <form
                          className="px-6 py-6 space-y-6"
                          onSubmit={handleReturnSubmit}
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <i className="fas fa-exclamation-circle text-primary text-xs"></i>
                              Return Reason
                            </label>
                            <Select name="reason" required>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a reason for your return" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wrong_item">
                                  <div className="flex items-center gap-2">
                                    <i className="fas fa-exchange-alt text-xs"></i>
                                    Wrong Item Received
                                  </div>
                                </SelectItem>
                                <SelectItem value="damaged_item">
                                  <div className="flex items-center gap-2">
                                    <i className="fas fa-box-open text-xs"></i>
                                    Damaged Item
                                  </div>
                                </SelectItem>
                                <SelectItem value="missing_item">
                                  <div className="flex items-center gap-2">
                                    <i className="fas fa-box text-xs"></i>
                                    Missing Item
                                  </div>
                                </SelectItem>
                                <SelectItem value="not_as_described">
                                  <div className="flex items-center gap-2">
                                    <i className="fas fa-info-circle text-xs"></i>
                                    Not as Described
                                  </div>
                                </SelectItem>
                                <SelectItem value="other">
                                  <div className="flex items-center gap-2">
                                    <i className="fas fa-ellipsis-h text-xs"></i>
                                    Other
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            <Button
                              type="submit"
                              className="gap-2 cursor-pointer"
                              disabled={submitting}
                            >
                              {submitting ? (
                                <>
                                  <i className="fas fa-spinner fa-spin"></i>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-paper-plane"></i>
                                  Submit Return Request
                                </>
                              )}
                            </Button>
                            <p className="text-xs text-muted-foreground">
                              We'll review your request within 24-48 hours
                            </p>
                          </div>
                        </form>
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
