"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../partials/sidebar";
import BreadcrumbOrder from "./partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { Fragment, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import OrderProductCard from "./partials/order-product";
import ApiLoader from "@/components/common/api-loader";
import { useApi } from "@/hooks/use-api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrderItems {
  id: number;
  order_id: number;
  product: {
    name: string;
    price: number;
  };
  image_url: string;
  product_id: number;
  quantity: number;
}

interface Order {
  id: number;
  user_id: number;
  status: string;
  order_items: OrderItems[];
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const { toastError } = useToast();
  const {
    data: orders,
    loading,
    execute: fetchOrders,
  } = useApi<Order[]>("/orders", "GET", []);

  useEffect(() => {
    fetchOrders().catch((error) => {
      console.error("Error fetching orders:", error);
      toastError("Failed to fetch orders. Please try again later.");
    });
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {loading ? (
                <ApiLoader message="Loading your orders..." />
              ) : (
                <Fragment>
                  {orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          My Orders
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Track and manage your orders
                        </p>
                      </div>

                      <Tabs
                        defaultValue="processing"
                        orientation="vertical"
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-auto w-full bg-transparent p-0">
                          <TabsTrigger
                            value="processing"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                          >
                            <i className="fas fa-spinner"></i>
                            <span>Processing</span>
                            <span className="ml-auto bg-gray-100 text-black/70 px-2 py-0.5 rounded-full text-xs font-semibold">
                              {
                                orders.filter((o) =>
                                  ["processing", "pending"].includes(
                                    o.status.toLowerCase()
                                  )
                                ).length
                              }
                            </span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="paid"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                          >
                            <i className="fas fa-truck"></i>
                            <span>Shipped</span>
                            <span className="ml-auto bg-gray-100 text-black/70 px-2 py-0.5 rounded-full text-xs font-semibold">
                              {
                                orders.filter((o) =>
                                  ["paid", "shipped"].includes(
                                    o.status.toLowerCase()
                                  )
                                ).length
                              }
                            </span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="delivered"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                          >
                            <i className="fas fa-check-circle"></i>
                            <span>Delivered</span>
                            <span className="ml-auto bg-gray-100 text-black/70 px-2 py-0.5 rounded-full text-xs font-semibold">
                              {
                                orders.filter(
                                  (o) => o.status.toLowerCase() === "completed"
                                ).length
                              }
                            </span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="cancelled"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                          >
                            <i className="fas fa-times-circle"></i>
                            <span>Cancelled</span>
                            <span className="ml-auto bg-gray-100 text-black/70 px-2 py-0.5 rounded-full text-xs font-semibold">
                              {
                                orders.filter(
                                  (o) => o.status.toLowerCase() === "cancelled"
                                ).length
                              }
                            </span>
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="processing" className="mt-4">
                          <div className="flex flex-col gap-3">
                            {orders.filter(
                              (order) =>
                                order.status.toLowerCase() === "processing" ||
                                order.status.toLowerCase() === "pending" ||
                                order.status.toLowerCase() === "confirmed"
                            ).length > 0 ? (
                              orders
                                .filter(
                                  (order) =>
                                    order.status.toLowerCase() ===
                                      "processing" ||
                                    order.status.toLowerCase() === "pending"
                                )
                                .map((order, index) => (
                                  <Fragment key={index}>
                                    {order.order_items.length > 1 ? (
                                      order.order_items.map((item, idx) => (
                                        <OrderProductCard
                                          key={idx}
                                          order={order}
                                          item={item}
                                          refetch={fetchOrders}
                                        />
                                      ))
                                    ) : (
                                      <OrderProductCard
                                        key={index}
                                        order={order}
                                        item={order.order_items[0]}
                                        refetch={fetchOrders}
                                      />
                                    )}
                                  </Fragment>
                                ))
                            ) : (
                              <div className="text-center mt-16 mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                  <i className="fal fa-spinner-third text-4xl text-gray-400"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  No Processing Orders
                                </h3>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                  You don't have any orders being processed at
                                  the moment.
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="delivered" className="mt-4">
                          <div className="flex flex-col gap-3">
                            {orders.filter(
                              (order) =>
                                order.status.toLowerCase() === "completed"
                            ).length > 0 ? (
                              orders
                                .filter(
                                  (order) =>
                                    order.status.toLowerCase() === "completed"
                                )
                                .map((order, index) => (
                                  <Fragment key={index}>
                                    {order.order_items.length > 1 ? (
                                      order.order_items.map((item, idx) => (
                                        <OrderProductCard
                                          key={idx}
                                          order={order}
                                          item={item}
                                          refetch={fetchOrders}
                                        />
                                      ))
                                    ) : (
                                      <OrderProductCard
                                        key={index}
                                        order={order}
                                        item={order.order_items[0]}
                                        refetch={fetchOrders}
                                      />
                                    )}
                                  </Fragment>
                                ))
                            ) : (
                              <div className="text-center mt-16 mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                  <i className="fal fa-check-circle text-4xl text-gray-400"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  No Delivered Orders
                                </h3>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                  You haven't received any completed orders yet.
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        <TabsContent value="paid" className="mt-4">
                          <div className="flex flex-col gap-3">
                            {orders.filter(
                              (order) =>
                                order.status.toLowerCase() === "paid" ||
                                order.status.toLowerCase() === "shipped"
                            ).length > 0 ? (
                              orders
                                .filter(
                                  (order) =>
                                    order.status.toLowerCase() === "paid" ||
                                    order.status.toLowerCase() === "shipped"
                                )
                                .map((order, index) => (
                                  <Fragment key={index}>
                                    {order.order_items.length > 1 ? (
                                      order.order_items.map((item, idx) => (
                                        <OrderProductCard
                                          key={idx}
                                          order={order}
                                          item={item}
                                          refetch={fetchOrders}
                                        />
                                      ))
                                    ) : (
                                      <OrderProductCard
                                        key={index}
                                        order={order}
                                        item={order.order_items[0]}
                                        refetch={fetchOrders}
                                      />
                                    )}
                                  </Fragment>
                                ))
                            ) : (
                              <div className="text-center mt-16 mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                  <i className="fal fa-truck text-4xl text-gray-400"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  No Shipped Orders
                                </h3>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                  You don't have any orders in transit right
                                  now.
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        <TabsContent value="cancelled" className="mt-4">
                          <div className="flex flex-col gap-3">
                            {orders.filter(
                              (order) =>
                                order.status.toLowerCase() === "cancelled"
                            ).length > 0 ? (
                              orders
                                .filter(
                                  (order) =>
                                    order.status.toLowerCase() === "cancelled"
                                )
                                .map((order, index) => (
                                  <Fragment key={index}>
                                    {order.order_items.length > 1 ? (
                                      order.order_items.map((item, idx) => (
                                        <OrderProductCard
                                          key={idx}
                                          order={order}
                                          item={item}
                                          refetch={fetchOrders}
                                        />
                                      ))
                                    ) : (
                                      <OrderProductCard
                                        key={index}
                                        order={order}
                                        item={order.order_items[0]}
                                        refetch={fetchOrders}
                                      />
                                    )}
                                  </Fragment>
                                ))
                            ) : (
                              <div className="text-center mt-16 mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                  <i className="fal fa-times-circle text-4xl text-gray-400"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  No Cancelled Orders
                                </h3>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                  You haven't cancelled any orders. That's
                                  great!
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ) : (
                    <div className="text-center mt-20 mb-12">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                        <i className="fal fa-shopping-bag text-5xl text-gray-400"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No Orders Yet
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Start shopping to see your orders here. Browse our
                        collection and find something you love!
                      </p>
                      <Link href="/shop">
                        <Button size="lg" className="font-semibold">
                          <i className="far fa-shopping-cart mr-2"></i>
                          Start Shopping
                        </Button>
                      </Link>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
