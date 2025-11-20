"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../partials/sidebar";
import BreadcrumbOrder from "./partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import api from "@/lib/axios";
import { Fragment, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OrderProductCard from "./partials/order-product";
import ApiLoader from "@/components/common/api-loader";

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
  const { user } = useAuthStore();
  const { toastError } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toastError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10 bg-white">
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
                    <Tabs
                      defaultValue="processing"
                      orientation="vertical"
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto w-full bg-white">
                        <TabsTrigger
                          value="processing"
                          className="w-full h-9 ring-2 ring-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold"
                        >
                          Pending / Processing
                        </TabsTrigger>
                        <TabsTrigger
                          value="paid"
                          className="w-full h-9 ring-2 ring-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold"
                        >
                          Paid / Shipped
                        </TabsTrigger>
                        <TabsTrigger
                          value="delivered"
                          className="w-full h-9 ring-2 ring-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold"
                        >
                          Delivered
                        </TabsTrigger>
                        <TabsTrigger
                          value="cancelled"
                          className="w-full h-9 ring-2 ring-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold"
                        >
                          Cancelled
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
                                  order.status.toLowerCase() === "processing" ||
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
                                      />
                                    ))
                                  ) : (
                                    <OrderProductCard
                                      key={index}
                                      order={order}
                                      item={order.order_items[0]}
                                    />
                                  )}
                                </Fragment>
                              ))
                          ) : (
                            <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                              <i className="fal fa-box-open text-6xl"></i>
                              You have no ongoing or delivered orders.
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
                                      />
                                    ))
                                  ) : (
                                    <OrderProductCard
                                      key={index}
                                      order={order}
                                      item={order.order_items[0]}
                                    />
                                  )}
                                </Fragment>
                              ))
                          ) : (
                            <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                              <i className="fal fa-box-open text-6xl"></i>
                              You have no delivered orders.
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
                                      />
                                    ))
                                  ) : (
                                    <OrderProductCard
                                      key={index}
                                      order={order}
                                      item={order.order_items[0]}
                                    />
                                  )}
                                </Fragment>
                              ))
                          ) : (
                            <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                              <i className="fal fa-box-open text-6xl"></i>
                              You have no paid or shipped orders.
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
                                      />
                                    ))
                                  ) : (
                                    <OrderProductCard
                                      key={index}
                                      order={order}
                                      item={order.order_items[0]}
                                    />
                                  )}
                                </Fragment>
                              ))
                          ) : (
                            <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                              <i className="fal fa-box-open text-6xl"></i>
                              You have no cancelled or returned orders.
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                      <i className="fal fa-box-open text-6xl"></i>
                      You have no orders yet.
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
