"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";

// Helper function to get status badge styling
const getStatusConfig = (status: string) => {
  const statusLower = status.toLowerCase();

  const configs: Record<string, { variant: any; icon: string; color: string }> =
    {
      pending: {
        variant: "secondary",
        icon: "fa-clock",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      processing: {
        variant: "default",
        icon: "fa-spinner",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      paid: {
        variant: "default",
        icon: "fa-check-circle",
        color: "bg-green-100 text-green-800 border-green-200",
      },
      shipped: {
        variant: "secondary",
        icon: "fa-truck",
        color: "bg-purple-100 text-purple-800 border-purple-200",
      },
      completed: {
        variant: "secondary",
        icon: "fa-check",
        color: "bg-green-100 text-green-800 border-green-200",
      },
      cancelled: {
        variant: "destructive",
        icon: "fa-times-circle",
        color: "bg-red-100 text-red-800 border-red-200",
      },
    };

  return (
    configs[statusLower] || {
      variant: "default",
      icon: "fa-info-circle",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    }
  );
};

export default function OrderProductCard({
  order,
  item,
  refetch,
}: {
  order: any;
  item: any;
  refetch: any;
}) {
  const statusConfig = getStatusConfig(order.status);
  const status = order.status.toLowerCase();
  const { toastError } = useToast();

  const handleCancelOrder = async (order_id: number) => {
    try {
      await api.post(`/orders/${order_id}/cancel`, {
        reason: "No longer interested.",
      });
      refetch();
    } catch (e) {
      console.log(e);
      toastError("Failed to cancel order.");
    }
  };

  return (
    <div className="bg-white border p-5 hover:shadow-md transition-all duration-200 group">
      <div className="flex gap-5">
        {/* Product Image */}
        <div className="shrink-0">
          <Link href={`/item/${item.product.id}`}>
            <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-gray-100 group-hover:ring-2 group-hover:ring-primary/20 transition-all">
              <Image
                src={
                  item?.product.image_url || "/images/products/product-1.jpg"
                }
                alt={item?.product.name}
                className="object-cover"
                fill
                sizes="112px"
              />
            </div>
          </Link>
        </div>

        {/* Order Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Product Name */}
              <Link
                href={`/item/${item.product.id}`}
                className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors line-clamp-1 block mb-2"
              >
                {item?.product.name}
              </Link>

              {/* Order Info */}
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="far fa-hashtag w-4"></i>
                  <span className="font-medium">Order #{order.id}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <i className="far fa-calendar w-4"></i>
                  <span>
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <i className="far fa-box w-4"></i>
                  <span>Quantity: {item.quantity}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                >
                  <i className={`fas ${statusConfig.icon}`}></i>
                  {order.status?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Menu */}
            <div className="shrink-0">
              {(status === "pending" || status === "processing") && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <i className="fas fa-ellipsis-v text-gray-600"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCancelOrder(order.id);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <i className="far fa-times-circle w-4"></i>
                        <span>Cancel Order</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {status === "completed" && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <i className="fas fa-ellipsis-v text-gray-600"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/account/orders/${order.id}/review`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <i className="far fa-star w-4"></i>
                        <span>Write a review</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/account/orders/${order.id}/dispute`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <i className="far fa-flag w-4"></i>
                        <span>Create Dispute</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/account/orders/${order.id}/${item.id}/return`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <i className="far fa-undo w-4"></i>
                        <span>Request Return</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
