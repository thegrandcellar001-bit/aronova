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
                  <div className="text-center text-muted-foreground mt-20">
                    <h2 className="text-2xl font-semibold mb-4">
                      You have no submitted disputes yet.
                    </h2>
                    <p className="mb-6">
                      Once you have purchased products, you can leave disputes
                      here.
                    </p>
                    <Link href="/shop">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-6">
                    {disputes?.map((disputeResp, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md mt-4 flex flex-col gap-y-4"
                      >
                        <div className="flex items-center gap-x-4">
                          <Image
                            src={
                              disputeResp.disputes[0]?.product_image_url || ""
                            }
                            alt={disputeResp.disputes[0]?.product_name || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-1.5">
                            {disputeResp.disputes[0]?.product_name}
                            <div className="text-sm text-muted-foreground">
                              Order No: {disputeResp.order_id}
                            </div>
                            <div>On: {disputeResp.order_created_at}</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <h3 className="font-semibold text-lg">
                            Your Disputes:
                          </h3>
                          {disputeResp.disputes.map((dispute, revIndex) => (
                            <div key={revIndex} className="border-t pt-2 mt-2">
                              <div className="flex items-center gap-x-2">
                                <span className="font-medium">
                                  {dispute.product_name}
                                </span>
                              </div>
                              <p className="mt-1">{dispute.reason}</p>
                              <p className="mt-1">{dispute.description}</p>
                              <div className="mt-1">
                                Resolution:{" "}
                                {dispute.resolution ? (
                                  <span>{dispute.resolution}</span>
                                ) : (
                                  <Badge variant="outline">Pending</Badge>
                                )}
                              </div>
                              {dispute.resolution && dispute.resolved_at && (
                                <div className="text-sm text-muted-foreground">
                                  Resolved on:{" "}
                                  {new Date(
                                    dispute.resolved_at
                                  ).toLocaleDateString()}
                                </div>
                              )}
                              <div className="text-sm text-muted-foreground">
                                Submitted on:{" "}
                                {new Date(
                                  dispute.created_at
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
