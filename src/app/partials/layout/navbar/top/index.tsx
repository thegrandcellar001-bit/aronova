"use client";

import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./user-avatar";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/auth";

const data: NavMenu = [
  {
    id: 1,
    label: "Discover",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Fashion Edit",
        url: "/discover#fashion",
        description: "Refined pieces from global ateliers.",
      },
      {
        id: 12,
        label: "Art & Objects",
        url: "/discover#art-objects",
        description: "Stories carved, painted, and preserved.",
      },
      {
        id: 13,
        label: "Home & Design",
        url: "/discover#home-design",
        description: "Spaces elevated by provenance.",
      },
      {
        id: 14,
        label: "Gifting",
        url: "/gifting",
        description: "Meaningful presents, delivered beautifully.",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "Editions",
    url: "/editions",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Archive",
    url: "/archive",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Stories",
    url: "/stories",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "Gifting",
    url: "/gifting",
    children: [],
  },
  {
    id: 6,
    type: "MenuItem",
    label: "Concierge",
    url: "/concierge",
    children: [],
  },
];

const TopNavbar = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <div className="flex items-center mx-3 lg:mx-6 w-[35px]">
            <Link href="/" className="block h-full w-full">
              <Image
                src="/icons/logo.png"
                alt="Aronova Logo"
                width={100}
                height={150}
                className="h-full w-full object-contain"
              />
            </Link>
          </div>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <i className="fas fa-search text-lg text-gray-400"></i>
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center gap-x-3">
          {/* <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <i className="fas fa-search text-xl"></i>
          </Link> */}
          <CartBtn />
          <Link href="/wishlist" className="p-1 ">
            <i className="far fa-heart text-2xl text-secondary"></i>
          </Link>
          {isAuthenticated ? (
            <UserAvatar />
          ) : (
            <Button
              className="rounded-full cursor-pointer hidden md:block"
              variant={"secondary"}
            >
              <Link href="/login" className="text-white">
                <i className="far fa-sign-in"></i> Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
