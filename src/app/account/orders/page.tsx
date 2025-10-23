"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../partials/sidebar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BreadcrumbOrder from "./partials/orders-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import { useAuthStore } from "@/lib/stores/auth";
import api from "@/lib/axios";
import { use, useEffect, useState } from "react";
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
  const { user } = useAuthStore();
  const { toastError } = useToast();
  // const [orders, setOrders] = useState<Order[]>([]);

  const orders = [
    {
      id: 1996965552,
      created_at: "2025-09-09",
      status: "shipped",
      order_items: [
        {
          name: "Men's Moccasin Leather Slip-on Loafers Dress Shoes",
          image_url: "/images/orders/1.jpg",
        },
      ],
    },
    {
      id: 386285731,
      created_at: "2025-09-10",
      status: "delivered",
      order_items: [
        {
          name:
            "Color Screen Smart Bracelet D13 Waterproof Bracelet Waterproof",
          image_url: "/images/orders/2.jpg",
        },
      ],
    },
    {
      id: 361494561,
      created_at: "2025-09-11",
      status: "shipped",
      order_items: [
        {
          name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
          image_url: "/images/orders/3.jpg",
        },
      ],
    },
    {
      id: 4,
      created_at: "2025-09-12",
      status: "processing",
      order_items: [
        {
          name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
          image_url: "/images/orders/3.jpg",
        },
      ],
    },
    {
      id: 5,
      created_at: "2025-09-12",
      status: "cancelled",
      order_items: [
        {
          name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
          image_url: "/images/orders/3.jpg",
        },
      ],
    },
    {
      id: 6,
      created_at: "2025-09-12",
      status: "returned",
      order_items: [
        {
          name: "Solid Color Men's Breathable Lace-up Canvas Sneakers - Khaki",
          image_url: "/images/orders/3.jpg",
        },
      ],
    },
  ];

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      // setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toastError("Failed to fetch orders. Please try again later.");
    }
  };

  useEffect(() => {
    // fetchOrders();
  }, []);

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbOrder />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              {!orders || orders.length === 0 ? (
                <div className="text-center text-muted-foreground mt-20">
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
                            order.status === "shipped" ||
                            order.status === "delivered" ||
                            order.status === "processing"
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
                      {orders
                        .filter(
                          (order) =>
                            order.status === "shipped" ||
                            order.status === "delivered" ||
                            order.status === "processing"
                        )
                        .map((order, index) => (
                          <div
                            key={index}
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
                            {order.status === "delivered" && (
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
                                        <i className="far fa-pen"></i> Write a
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
                            )}
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <div className="flex flex-col gap-3">
                      {orders
                        .filter(
                          (order) =>
                            order.status === "cancelled" ||
                            order.status === "returned"
                        )
                        .map((order, index) => (
                          <div
                            key={index}
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
                                    order.status === "cancelled"
                                      ? "destructive"
                                      : "outline"
                                  }
                                  className="rounded-sm font-semibold"
                                >
                                  {order.status?.toUpperCase()}
                                </Badge>
                              </div>
                              <div>On: {order.created_at}</div>
                            </div>
                          </div>
                        ))}
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
