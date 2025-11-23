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

interface DisputeItems {
  product_id: string;
  product_name: string;
  product_image_url: string;
  category_slug: string;
  reason: string;
  description: string;
  resolution: string;
  resolved_at: string | null;
  created_at: string;
}

interface DisputeResponse {
  order_id: number;
  order_created_at: string;
  status: string;
  customer_id: number;
  merchant_id: number;
  disputes: DisputeItems[];
}

export default function Page() {
  const { user } = useAuthStore();
  const { toastError } = useToast();
  const {
    data: disputes,
    loading,
    execute: fetchDisputes,
  } = useApi<DisputeResponse[]>("/disputes", "GET", []);

  useEffect(() => {
    fetchDisputes().catch((error) => {
      console.error("Error fetching disputes:", error);
      toastError("Failed to fetch disputes. Please try again later.");
    });
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10 bg-white">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder
            subLink={{ title: "Disputes", path: "/orders/disputes" }}
          />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            {loading ? (
              <ApiLoader message="Loading your disputes..." />
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                {!disputes || !disputes.length ? (
                  <div className="flex flex-col items-center justify-center mt-20 px-4">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                      <i className="fas fa-file-contract text-4xl text-muted-foreground"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">
                      No Disputes Yet
                    </h2>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      You haven't submitted any disputes. If you have issues
                      with your orders after delivery, you can submit a dispute
                      here.
                    </p>
                    <Link href="/shop">
                      <Button className="gap-2">
                        <i className="fas fa-shopping-bag"></i>
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground">
                        My Disputes
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Track and manage your order disputes
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      {disputes?.map((disputeResp, index) => (
                        <div
                          key={index}
                          className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card overflow-hidden"
                        >
                          {/* Order Header */}
                          <div className="bg-muted/30 px-6 py-4 border-b">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-3">
                                <i className="fas fa-receipt text-muted-foreground"></i>
                                <div>
                                  <span className="font-semibold text-foreground">
                                    Order #{disputeResp.order_id}
                                  </span>
                                  <span className="text-sm text-muted-foreground ml-3">
                                    {new Date(
                                      disputeResp.order_created_at
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant="secondary"
                                className="font-medium"
                              >
                                {disputeResp.disputes.length}{" "}
                                {disputeResp.disputes.length === 1
                                  ? "Dispute"
                                  : "Disputes"}
                              </Badge>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="px-6 py-4 border-b bg-background">
                            <div className="flex items-center gap-4">
                              <Image
                                src={
                                  disputeResp.disputes[0]?.product_image_url ||
                                  ""
                                }
                                alt={
                                  disputeResp.disputes[0]?.product_name || ""
                                }
                                className="rounded-lg object-cover border"
                                width={80}
                                height={80}
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground text-lg">
                                  {disputeResp.disputes[0]?.product_name}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Primary disputed item
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Disputes List */}
                          <div className="px-6 py-4 space-y-4">
                            {disputeResp.disputes.map((dispute, revIndex) => (
                              <div
                                key={revIndex}
                                className={`pb-4 ${
                                  revIndex !== disputeResp.disputes.length - 1
                                    ? "border-b"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <i className="fas fa-box text-primary text-sm"></i>
                                      <span className="font-semibold text-foreground">
                                        {dispute.product_name}
                                      </span>
                                    </div>
                                    <div className="space-y-2 ml-6">
                                      <div className="flex items-start gap-2">
                                        <span className="text-sm font-medium text-muted-foreground min-w-[100px]">
                                          Reason:
                                        </span>
                                        <span className="text-sm text-foreground font-medium">
                                          {dispute.reason
                                            .split("_")
                                            .map(
                                              (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                            )
                                            .join(" ")}
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="text-sm font-medium text-muted-foreground min-w-[100px]">
                                          Description:
                                        </span>
                                        <span className="text-sm text-foreground">
                                          {dispute.description}
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="text-sm font-medium text-muted-foreground min-w-[100px]">
                                          Status:
                                        </span>
                                        {dispute.resolution ? (
                                          <div className="flex flex-col gap-1">
                                            <Badge
                                              variant="default"
                                              className="w-fit bg-green-500 hover:bg-green-600"
                                            >
                                              <i className="fas fa-check-circle mr-1"></i>
                                              Resolved
                                            </Badge>
                                            <span className="text-sm text-foreground mt-1">
                                              {dispute.resolution}
                                            </span>
                                          </div>
                                        ) : (
                                          <Badge
                                            variant="secondary"
                                            className="w-fit bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                          >
                                            <i className="fas fa-clock mr-1"></i>
                                            Pending Review
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Timestamps */}
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground ml-6 mt-3">
                                  <div className="flex items-center gap-1.5">
                                    <i className="far fa-calendar"></i>
                                    <span>
                                      Submitted:{" "}
                                      {new Date(
                                        dispute.created_at
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  {dispute.resolution &&
                                    dispute.resolved_at && (
                                      <div className="flex items-center gap-1.5">
                                        <i className="far fa-check-circle"></i>
                                        <span>
                                          Resolved:{" "}
                                          {new Date(
                                            dispute.resolved_at
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
