"use client";

import { useCategories } from "@/app/providers/category-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function ShopCategories() {
  const { categories } = useCategories();

  return (
    <NavigationMenu className="sticky top-3 mb-8">
      <NavigationMenuList>
        <NavigationMenuItem>
          {categories.length > 0 &&
            categories.map((category) => (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                key={category.id}
              >
                <Link href={`/cat/${category.category_slug}`}>
                  {category.name}
                </Link>
              </NavigationMenuLink>
            ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
