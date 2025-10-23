"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbDispute from "./partials/dispute-breadcrumb";
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
  const [dispute, setDispute] = useState<any>(null);

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

  const fetchDispute = async () => {
    try {
      const res = await api.get(`/disputes/${params.id}`);
      setDispute(res.data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
      toastError("Failed to fetch disputes. Please try again later.");
    }
  };

  const handleDisputeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const reason = formData.get("reason");
    const description = formData.get("description");

    try {
      const res = await api.post(`/disputes`, {
        order_id: params.id,
        reason,
        description,
      });
      toastSuccess("Dispute submitted successfully.");
    } catch (error) {
      console.error("Error submitting dispute:", error);
      toastError("Failed to submit dispute. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchDispute();
  }, []);

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbDispute />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {!order ? (
                <div className="text-center text-muted-foreground mt-20">
                  No disputes found.
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
                        <div className="mt-2 mb-6">
                          <h3 className="text-lg font-semibold">
                            Submit a Dispute for this Order
                          </h3>
                          <form
                            className="flex flex-col gap-y-4 mt-4"
                            onSubmit={handleDisputeSubmit}
                          >
                            <div>
                              <label className="block mb-1 font-medium">
                                Dispute Reason
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
                            <div className="space-y-2">
                              <label className="block mb-1 font-medium">
                                Dispute Description
                              </label>
                              <Textarea
                                className="w-full border rounded-md p-2"
                                rows={4}
                                placeholder="Write your dispute description here..."
                                name="description"
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
