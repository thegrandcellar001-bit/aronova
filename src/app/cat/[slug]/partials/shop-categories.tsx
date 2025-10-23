"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useCategoryStore } from "@/lib/stores/categories";

export default function ShopCategories() {
  const { categories } = useCategoryStore();

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
