"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbOrder from "./partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import api from "@/lib/axios";
import { Fragment, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import OrderProductCard from "./partials/order-product";

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

  // const orders = [
  //   {
  //     id: 1996965552,
  //     created_at: "2025-09-09",
  //     status: "shipped",
  //     order_items: [
  //       {
  //         name: "Men's Moccasin Leather Slip-on Loafers Dress Shoes",
  //         image_url: "/images/orders/1.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: 386285731,
  //     created_at: "2025-09-10",
  //     status: "delivered",
  //     order_items: [
  //       {
  //         name: "Color Screen Smart Bracelet D13 Waterproof Bracelet Waterproof",
  //         image_url: "/images/orders/2.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: 361494561,
  //     created_at: "2025-09-11",
  //     status: "shipped",
  //     order_items: [
  //       {
  //         name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
  //         image_url: "/images/orders/3.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     created_at: "2025-09-12",
  //     status: "processing",
  //     order_items: [
  //       {
  //         name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
  //         image_url: "/images/orders/3.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     created_at: "2025-09-12",
  //     status: "cancelled",
  //     order_items: [
  //       {
  //         name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
  //         image_url: "/images/orders/3.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     created_at: "2025-09-12",
  //     status: "returned",
  //     order_items: [
  //       {
  //         name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
  //         image_url: "/images/orders/3.jpg",
  //       },
  //     ],
  //   },
  // ];

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toastError("Failed to fetch orders. Please try again later.");
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
              {!orders || orders.length === 0 ? (
                <div className="text-center text-muted-foreground mt-20 flex flex-col items-center gap-y-6">
                  <i className="fal fa-box-open text-6xl"></i>
                  You have no orders yet.
                </div>
              ) : (
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="account" className="w-full">
                      Ongoing / Delivered (
                      {
                        orders.filter(
                          (order) =>
                            order.status.toLowerCase() === "shipped" ||
                            order.status.toLowerCase() === "delivered" ||
                            order.status.toLowerCase() === "pending"
                        ).length
                      }
                      )
                    </TabsTrigger>
                    <TabsTrigger value="password" className="w-full">
                      Cancelled / Returned (
                      {
                        orders.filter(
                          (order) =>
                            order.status === "cancelled" ||
                            order.status === "returned"
                        ).length
                      }
                      )
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <div className="flex flex-col gap-3">
                      {orders.filter(
                        (order) =>
                          order.status.toLowerCase() === "shipped" ||
                          order.status.toLowerCase() === "delivered" ||
                          order.status.toLowerCase() === "pending"
                      ).length > 0 ? (
                        orders
                          .filter(
                            (order) =>
                              order.status.toLowerCase() === "shipped" ||
                              order.status.toLowerCase() === "delivered" ||
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

                  <TabsContent value="password" className="mt-4">
                    <div className="flex flex-col gap-3">
                      {orders.filter(
                        (order) =>
                          order.status.toLowerCase() === "cancelled" ||
                          order.status.toLowerCase() === "returned"
                      ).length > 0 ? (
                        orders
                          .filter(
                            (order) =>
                              order.status.toLowerCase() === "cancelled" ||
                              order.status.toLowerCase() === "returned"
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
              )}
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
