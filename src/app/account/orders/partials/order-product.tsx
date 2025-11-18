import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export default function OrderProductCard({
  order,
  item,
}: {
  order: any;
  item: any;
}) {
  return (
    <div className="border p-4 rounded-md mt-4 flex items-center gap-x-4">
      <Image
        src={item?.image_url || "/images/products/product-1.jpg"}
        alt={item?.product.name}
        className="rounded-lg"
        width={110}
        height={110}
      />
      <div className="space-y-1.5">
        <div className="text-lg">{item?.product.name}</div>
        <div className="text-sm text-muted-foreground">
          Order No: {order.id}
        </div>
        <div className="text-sm">
          On: {new Date(order.created_at).toLocaleDateString()}
        </div>
        <div className="text-sm text-muted-foreground">
          <Badge
            variant={
              order.status.toLowerCase() === "delivered" ||
              order.status.toLowerCase() === "shipped" ||
              order.status.toLowerCase() === "pending"
                ? "secondary"
                : order.status.toLowerCase() === "cancelled"
                ? "destructive"
                : "default"
            }
            className={`rounded-sm font-semibold ${
              order.status.toLowerCase() === "delivered" ||
              order.status.toLowerCase() === "shipped"
                ? "text-white"
                : ""
            }`}
          >
            {order.status?.toUpperCase()}
          </Badge>
        </div>
      </div>
      {order.status.toLowerCase() === "delivered" && (
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
              <DropdownMenuItem className="cursor-pointer py-2" asChild>
                <Link href={`/account/orders/${order.id}/review`}>
                  <i className="far fa-pen"></i> Write a review
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2" asChild>
                <Link href={`/account/orders/${order.id}/dispute`}>
                  <i className="far fa-flag"></i> Create dispute
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2" asChild>
                <Link href={`/account/orders/${order.id}/return`}>
                  <i className="far fa-box"></i>
                  Return this item
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
