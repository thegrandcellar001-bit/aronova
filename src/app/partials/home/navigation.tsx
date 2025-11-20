"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth";
import { UserAvatar } from "../layout/navbar/top/user-avatar";
import CartBtn from "../layout/navbar/top/CartBtn";
import Link from "next/link";
import { useWishlist } from "@/app/providers/wishlist-provider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      name: "About Us",
      path: "/about",
    },
  ];
  const { isAuthenticated } = useAuthStore();
  const { itemsCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileNav = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-6 pt-2 pb-3 mb-3 space-y-1">
        {navItems.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="hover:ring-2 hover:ring-primary p-2"
          >
            <Link
              href={item.path}
              className="block py-2 font-semibold transition-colors duration-200 flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name} <i className="far fa-chevron-right"></i>
            </Link>
          </motion.div>
        ))}

        {isAuthenticated ? (
          <></>
        ) : (
          <div className="pt-2 space-y-2">
            <Button className="ring-2 ring-primary" variant={"outline"} asChild>
              <Link
                href="/login"
                className="w-full flex items-center justify-center rounded-md text-primary cursor-pointer"
              >
                Sign In
              </Link>
            </Button>

            <Button className="mt-2" variant={"default"} asChild>
              <Link
                href="/register"
                className="w-full flex items-center justify-center text-white cursor-pointer"
              >
                Register an account
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-xs border">
      <div className="max-w-[1400px] mx-auto lg:px-20">
        <div className="flex items-center justify-between h-20 pl-2 pr-4">
          <div className="flex items-center gap-1">
            {isMobile && (
              <motion.button
                className="text-2xl p-2 mr-2 cursor-pointer transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <i className="far fa-close" />
                ) : (
                  <i className="far fa-bars" />
                )}
              </motion.button>
            )}

            {/* Logo */}
            <a href="/" className="block hover:opacity-80 transition-opacity">
              <img
                src="/icons/logo.png"
                alt="ARONOVA"
                className="h-10 w-auto"
              />
            </a>
          </div>

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
            <Link href="/wishlist" className="p-1 relative">
              <i className="far fa-heart text-2xl text-primary"></i>
              {itemsCount > 0 && (
                <span className="absolute top-[-7px] -right-0.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-primary rounded-full">
                  {itemsCount}
                </span>
              )}
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

      {mobileMenuOpen && isMobile && mobileNav()}
    </nav>
  );
};

export default Navigation;
