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
  const params = useParams<{ id: string }>();
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
  } = useApi<any>(`/returns-requests/order/${params.id}`);
  const { execute: submitReturn } = useApi("/return-requests", "POST");

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const reason = formData.get("reason");

    try {
      await submitReturn({
        data: {
          order_item_id: params.id,
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
    if (params.id) {
      fetchOrder().catch((error) => {
        console.error("Error fetching order:", error);
        toastError("Failed to fetch order. Please try again later.");
      });
      fetchReturn().catch((error) => {
        console.error("Error fetching return:", error);
      });
    }
  }, [params.id]);

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
                  <div className="text-center text-muted-foreground mt-20">
                    No returns requests found.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {order.status === "completed" ? (
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
                              <Badge className="rounded-sm font-semibold text-white">
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
                                    <i className="far fa-star"></i> Write a
                                    review
                                  </Link>
                                </DropdownMenuItem>
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
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {returnRequest ? (
                          <div className="mt-2 mb-6">
                            <h3 className="text-lg font-semibold">
                              Your Return Request
                            </h3>
                            <div className="mt-2 border p-4 rounded-md">
                              <div className="flex items-center mb-2">
                                <span className="font-medium">Reason:</span>{" "}
                                <span className="ml-2">
                                  {returnRequest.reason}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <span className="font-medium">Status:</span>{" "}
                                <span className="ml-2">
                                  {returnRequest.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 mb-6">
                            <h3 className="text-lg font-semibold">
                              Request a return for this order
                            </h3>
                            <form
                              className="flex flex-col gap-y-4 mt-4"
                              onSubmit={handleReturnSubmit}
                            >
                              <div>
                                <label className="block mb-1 font-medium">
                                  Return Reason
                                </label>
                                <Select name="reason" required>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="wrong_item">
                                      Wrong Item Received
                                    </SelectItem>
                                    <SelectItem value="damaged_item">
                                      Damaged Item
                                    </SelectItem>
                                    <SelectItem value="missing_item">
                                      Missing Item
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                type="submit"
                                className="w-fit cursor-pointer"
                              >
                                Submit Return Request
                              </Button>
                            </form>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground mt-20">
                        Order return option is available only after delivery.
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
