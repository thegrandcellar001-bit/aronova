import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItemClassName = "font-normal px-3";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(navigationMenuTriggerStyle(), "font-normal px-3")}
      >
        <Link href={url ?? "/"}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
