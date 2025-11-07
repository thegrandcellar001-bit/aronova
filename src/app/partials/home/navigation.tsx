"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth";
import { UserAvatar } from "../layout/navbar/top/user-avatar";
import CartBtn from "../layout/navbar/top/CartBtn";
import Link from "next/link";

const Navigation = () => {
  const navItems = [
    {
      name: "Discover",
      path: "/discover",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Editions",
      path: "/editions",
    },
    {
      name: "Stories",
      path: "/stories",
    },
    {
      name: "Concierge",
      path: "/concierge",
    },
    {
      name: "ReAronova",
      path: "/re-aronova",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="block hover:opacity-80 transition-opacity">
            <img src="/icons/logo.png" alt="ARONOVA" className="h-10 w-auto" />
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.path}
                  className="text-sm font-sans tracking-wide text-foreground hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-x-4">
            <CartBtn />
            <Link href="/wishlist" className="p-1 ">
              <i className="far fa-heart text-2xl text-primary"></i>
            </Link>

            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <Button
                className="cursor-pointer hidden md:block"
                variant="default"
              >
                <Link href="/login" className="text-white">
                  <i className="far fa-sign-in mr-1"></i> Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
