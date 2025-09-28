import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { FaUserCircle } from "react-icons/fa";

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
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            Aronova
          </Link>
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
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1" legacyBehavior>
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          <Link href="/login" className="p-1" legacyBehavior>
            <i className="far fa-user-circle text-xl"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
