"use client";

import Sidebar from "@/app/account/partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbDispute from "./partials/dispute-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { Fragment, useEffect } from "react";
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

interface DisputeResponse {
  customer_id: number;
  disputes: {
    category_slug: string;
    created_at: string;
    description: string;
    product_id: string;
    product_image_url: string;
    product_name: string;
    reason: string;
    resolution: string;
    resolved_at: string;
  }[];
  merchant_id: string;
  order_created_at: string;
  order_id: string;
  status: string;
}

export default function Page() {
  const params = useParams<{ id: string }>();

  const {
    data: dispute,
    loading: disputeLoading,
    execute: fetchDispute,
  } = useApi<DisputeResponse>(`/disputes/order/${params.id}`);

  useEffect(() => {
    if (params.id) {
      fetchDispute(); // This returns the dispute if it exists, or null/error if not
    }
  }, [params.id]);

  const handleDisputeSuccess = () => {
    fetchDispute(); // Refresh dispute data after successful submission
  };

  const isLoading = disputeLoading;

  return (
    <AuthGuard>
      <main className="pt-26 pb-10">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbDispute />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {isLoading && !dispute ? (
                <ApiLoader message="Loading dispute details..." />
              ) : !dispute ? (
                <div className="flex flex-col items-center justify-center mt-20 px-4">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                    <i className="fas fa-info-circle text-4xl text-muted-foreground"></i>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Dispute Not Available
                  </h2>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    Disputes are only available for orders that have been
                    delivered. Please check back after your order is delivered.
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
                  {dispute.disputes && dispute.disputes.length > 0 ? (
                    <Fragment>
                      {/* Order Summary Card */}
                      <div className="border rounded-lg shadow-sm bg-card overflow-hidden">
                        <div className="bg-muted/30 px-6 py-4 border-b">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              <i className="fas fa-receipt text-muted-foreground"></i>
                              <div>
                                <span className="font-semibold text-foreground">
                                  Order #{dispute.order_id}
                                </span>
                                <span className="text-sm text-muted-foreground ml-3">
                                  {new Date(
                                    dispute.disputes[0].created_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                            <Badge className="rounded-sm font-semibold">
                              {dispute.status?.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        {/* Product Display */}
                        <div className="px-6 py-5 border-b bg-background">
                          <div className="flex items-start gap-4">
                            <Image
                              src={dispute.disputes[0].product_image_url || ""}
                              alt={dispute.disputes[0].product_name || ""}
                              className="rounded-lg object-cover border"
                              width={120}
                              height={120}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground text-xl mb-2">
                                {dispute.disputes[0].product_name}
                              </h3>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <i className="far fa-calendar"></i>
                                  <span>
                                    Submitted:{" "}
                                    {new Date(
                                      dispute.disputes[0].created_at
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
                                      href={`/account/orders/${dispute.order_id}/review`}
                                    >
                                      <i className="far fa-star mr-2"></i> Write
                                      a review
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    asChild
                                  >
                                    <Link
                                      href={`/account/orders/${dispute.order_id}/return`}
                                    >
                                      <i className="far fa-box mr-2"></i>
                                      Return this item
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>

                        {/* Dispute Details */}
                        <div className="px-6 py-5">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <i className="fas fa-file-alt text-primary"></i>
                            Dispute Details
                          </h3>
                          <div className="space-y-4 bg-muted/20 rounded-lg p-4 border">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fas fa-exclamation text-primary text-sm"></i>
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-foreground block mb-1">
                                  Reason
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {dispute.disputes[0].reason
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fas fa-align-left text-primary text-sm"></i>
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-foreground block mb-1">
                                  Description
                                </span>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {dispute.disputes[0].description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fas fa-info-circle text-primary text-sm"></i>
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-foreground block mb-1">
                                  Status
                                </span>
                                {dispute.disputes[0].resolution ? (
                                  <div className="space-y-2">
                                    <Badge
                                      variant="default"
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      <i className="fas fa-check-circle mr-1"></i>
                                      Resolved
                                    </Badge>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {dispute.disputes[0].resolution}
                                    </p>
                                    {dispute.disputes[0].resolved_at && (
                                      <p className="text-xs text-muted-foreground">
                                        Resolved on:{" "}
                                        {new Date(
                                          dispute.disputes[0].resolved_at
                                        ).toLocaleDateString("en-US", {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </p>
                                    )}
                                  </div>
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
                    </Fragment>
                  ) : (
                    <DisputeForm
                      orderId={params.id}
                      onSuccess={handleDisputeSuccess}
                    />
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
