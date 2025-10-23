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

interface ReturnItems {
  product_id: string;
  product_name: string;
  product_image_url: string;
  category_slug: string;
  reason: string;
  status: string;
  created_at: string;
}

interface ReturnResponse {
  order_id: number;
  order_created_at: string;
  customer_id: number;
  returns: ReturnItems[];
}

export default function Page() {
  const { user } = useAuthStore();
  const { toastError } = useToast();
  const [returns, setReturns] = useState<ReturnResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const res = await api.get("/return-requests");
      setReturns(res.data);
    } catch (error) {
      console.error("Error fetching returns:", error);
      toastError("Failed to fetch returns. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchReturns();
    setTimeout(() => {
      setLoading(false);
      setReturns([]);
    }, 1500);
  }, []);

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            {loading ? (
              <ApiLoader message="Loading your return requests..." />
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                {!returns.length ? (
                  <div className="text-center text-muted-foreground mt-20">
                    <h2 className="text-2xl font-semibold mb-4">
                      You have no orders to return yet.
                    </h2>
                    <p className="mb-6">
                      Once you have purchased products, you can return them and
                      they will be processed accordingly.
                    </p>
                    <Link href="/shop">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-6">
                    {returns.map((returnResp, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md mt-4 flex flex-col gap-y-4"
                      >
                        <div className="flex items-center gap-x-4">
                          <Image
                            src={returnResp.returns[0]?.product_image_url || ""}
                            alt={returnResp.returns[0]?.product_name || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-1.5">
                            {returnResp.returns[0]?.product_name}
                            <div className="text-sm text-muted-foreground">
                              Order No: {returnResp.order_id}
                            </div>
                            <div>On: {returnResp.order_created_at}</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <h3 className="font-semibold text-lg">
                            Your Returns:
                          </h3>
                          {returnResp.returns.map((returnItem, revIndex) => (
                            <div key={revIndex} className="border-t pt-2 mt-2">
                              <div className="flex items-center gap-x-2">
                                <span className="font-medium">
                                  {returnItem.product_name}
                                </span>
                              </div>
                              <p className="mt-1">{returnItem.reason}</p>
                              <p className="mt-1">{returnItem.status}</p>
                              <div className="text-sm text-muted-foreground">
                                Returned on:{" "}
                                {new Date(
                                  returnItem.created_at
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
