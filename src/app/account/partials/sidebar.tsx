"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col border rounded-sm w-full md:max-w-[300px] p-4">
      <div className="mb-2">
        <h3 className="font-semibold text-md">Manage Account</h3>
        <div className="flex flex-col gap-y-2 my-2">
          <Link
            href="/account"
            className={`${
              pathname === "/account" ? "text-primary" : "text-gray-500"
            } flex items-center gap-x-2`}
          >
            <i className="far fa-user"></i> My Account
          </Link>
          <Link
            href="/account/address"
            className={`${
              pathname === "/account/address" ? "text-primary" : "text-gray-500"
            } flex items-center gap-x-2`}
          >
            <i className="far fa-address-book"></i> Address Book
          </Link>
          <Link
            href="/account/payment"
            className={`${
              pathname === "/account/payment" ? "text-primary" : "text-gray-500"
            } flex items-center gap-x-2`}
          >
            <i className="far fa-credit-card"></i> Payment Method
          </Link>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-md">Orders</h3>
        <div className="flex flex-col gap-y-2 my-2">
          <Link
            href="/account/orders"
            className={`${
              pathname === "/account/orders" ? "text-primary" : "text-gray-500"
            } flex items-center gap-x-2`}
          >
            <i className="far fa-box"></i> Orders
          </Link>
          <Link
            href="/wishlist"
            className={`${
              pathname === "/wishlist" ? "text-primary" : "text-gray-500"
            } flex items-center gap-x-2`}
          >
            <i className="far fa-heart"></i> Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}
