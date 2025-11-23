"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = {
    account: [
      { href: "/account", icon: "fa-user", label: "My Account" },
      {
        href: "/account/address",
        icon: "fa-address-book",
        label: "Address Book",
      },
    ],
    orders: [
      { href: "/account/orders", icon: "fa-box", label: "Orders" },
      { href: "/account/orders/reviews", icon: "fa-star", label: "Reviews" },
      { href: "/account/orders/disputes", icon: "fa-flag", label: "Disputes" },
      { href: "/account/orders/returns", icon: "fa-undo", label: "Returns" },
    ],
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col w-full md:max-w-[300px] bg-card border rounded-lg shadow-sm overflow-hidden sticky top-28 self-start">
      {/* Account Section */}
      <div className="border-b bg-muted/20">
        <div className="px-5 py-4">
          <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <i className="fas fa-user-circle text-primary"></i>
            Manage Account
          </h3>
        </div>
        <nav className="px-2 pb-3 space-y-1">
          {navItems.account.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-all duration-200 ease-in-out
                ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }
              `}
            >
              <i
                className={`far ${
                  item.icon
                } w-5 text-center transition-transform duration-200 ${
                  isActive(item.href) ? "" : "group-hover:scale-110"
                }`}
              ></i>
              <span>{item.label}</span>
              {isActive(item.href) && (
                <i className="fas fa-chevron-right ml-auto text-xs"></i>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Orders Section */}
      <div className="bg-background">
        <div className="px-5 py-4">
          <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <i className="fas fa-shopping-bag text-primary"></i>
            Orders
          </h3>
        </div>
        <nav className="px-2 pb-3 space-y-1">
          {navItems.orders.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-all duration-200 ease-in-out
                ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }
              `}
            >
              <i
                className={`far ${
                  item.icon
                } w-5 text-center transition-transform duration-200 ${
                  isActive(item.href) ? "" : "group-hover:scale-110"
                }`}
              ></i>
              <span>{item.label}</span>
              {isActive(item.href) && (
                <i className="fas fa-chevron-right ml-auto text-xs"></i>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
