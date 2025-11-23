"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbDispute from "./partials/dispute-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import DisputeForm from "./partials/dispute-form";
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
  const params = useParams<{ id: string }>();

  const {
    data: order,
    loading: orderLoading,
    execute: fetchOrder,
  } = useApi<Order>(`/orders/${params.id}`);

  const {
    data: dispute,
    loading: disputeLoading,
    execute: fetchDispute,
  } = useApi<any>(`/disputes/order/${params.id}`);

  useEffect(() => {
    if (params.id) {
      fetchOrder();
      fetchDispute(); // This returns the dispute if it exists, or null/error if not
    }
  }, [params.id]);

  const handleDisputeSuccess = () => {
    fetchDispute(); // Refresh dispute data after successful submission
  };

  const isLoading = orderLoading || disputeLoading;

  return (
    <AuthGuard>
      <main className="pt-26 pb-10">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbDispute />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {isLoading && !order ? (
                <ApiLoader message="Loading order details..." />
              ) : !order ? (
                <div className="text-center text-muted-foreground mt-20">
                  Order not found.
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
                                  href={`/account/orders/${order.id}/review`}
                                >
                                  <i className="far fa-star"></i> Write a review
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
                      </div>

                      {dispute ? (
                        <div className="mt-2 mb-6">
                          <h3 className="text-lg font-semibold">
                            Your dispute details
                          </h3>
                          <div className="mt-2 border p-4 rounded-md">
                            <div className="flex items-center mb-2">
                              <span className="font-medium">Reason:</span>{" "}
                              <span className="ml-2">{dispute.reason}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <span className="font-medium">Description:</span>{" "}
                              <span className="ml-2">
                                {dispute.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <DisputeForm
                          orderId={params.id}
                          onSuccess={handleDisputeSuccess}
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground mt-20">
                      Dispute option is available only after delivery.
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
