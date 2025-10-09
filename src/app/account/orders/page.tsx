"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbOrder from "./partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";

export default function Page() {
  const { user } = useAuthStore();

  const orders = [
    {
      id: 1,
      title: "Men's Moccasin Leather Slip-on Loafers Dress Shoes",
      orderNo: 1996965552,
      orderDate: "2025-09-09",
      orderStatus: "shipped",
      image: "/images/orders/1.jpg",
    },
    {
      id: 2,
      title: "Color Screen Smart Bracelet D13 Waterproof Bracelet Waterproof",
      orderNo: 386285731,
      orderDate: "2025-09-10",
      orderStatus: "delivered",
      image: "/images/orders/2.jpg",
    },
    {
      id: 3,
      title: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
      orderNo: 361494561,
      orderDate: "2025-09-11",
      orderStatus: "shipped",
      image: "/images/orders/3.jpg",
    },
    {
      id: 4,
      title: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
      orderNo: 123456789,
      orderDate: "2025-09-12",
      orderStatus: "processing",
      image: "/images/orders/3.jpg",
    },
    {
      id: 5,
      title: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
      orderNo: 123456789,
      orderDate: "2025-09-12",
      orderStatus: "cancelled",
      image: "/images/orders/3.jpg",
    },
    {
      id: 6,
      title: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
      orderNo: 123456789,
      orderDate: "2025-09-12",
      orderStatus: "returned",
      image: "/images/orders/3.jpg",
    },
  ];

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="account" className="w-full">
                    Ongoing / Delivered (
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "shipped" ||
                          order.orderStatus === "delivered" ||
                          order.orderStatus === "processing"
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="password" className="w-full">
                    Cancelled / Returned (
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "cancelled" ||
                          order.orderStatus === "returned"
                      ).length
                    }
                    )
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  <div className="flex flex-col gap-3">
                    {orders
                      .filter(
                        (order) =>
                          order.orderStatus === "shipped" ||
                          order.orderStatus === "delivered" ||
                          order.orderStatus === "processing"
                      )
                      .map((order, index) => (
                        <div
                          key={index}
                          className="border p-4 rounded-md mt-4 flex items-center gap-x-4"
                        >
                          <Image
                            src={order.image || ""}
                            alt={order.title || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-1.5">
                            {order.title}
                            <div className="text-sm text-muted-foreground">
                              Order No: {order.orderNo}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <Badge
                                variant={
                                  order.orderStatus === "delivered" ||
                                  order.orderStatus === "shipped"
                                    ? "secondary"
                                    : "default"
                                }
                                className={`rounded-sm font-semibold ${
                                  order.orderStatus === "delivered" ||
                                  order.orderStatus === "shipped"
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {order.orderStatus?.toUpperCase()}
                              </Badge>
                            </div>
                            <div>On: {order.orderDate}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <div className="flex flex-col gap-3">
                    {orders
                      .filter(
                        (order) =>
                          order.orderStatus === "cancelled" ||
                          order.orderStatus === "returned"
                      )
                      .map((order, index) => (
                        <div
                          key={index}
                          className="border p-4 rounded-md mt-4 flex items-center gap-x-4"
                        >
                          <Image
                            src={order.image || ""}
                            alt={order.title || ""}
                            className="rounded-lg"
                            width={110}
                            height={110}
                          />
                          <div className="space-y-1.5">
                            {order.title}
                            <div className="text-sm text-muted-foreground">
                              Order No: {order.orderNo}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <Badge
                                variant={
                                  order.orderStatus === "cancelled"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="rounded-sm font-semibold"
                              >
                                {order.orderStatus?.toUpperCase()}
                              </Badge>
                            </div>
                            <div>On: {order.orderDate}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
