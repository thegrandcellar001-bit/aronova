import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "Discover",
    children: [
      { id: 11, label: "Shop", url: "/discover" },
      { id: 12, label: "Editions", url: "/editions" },
      { id: 13, label: "Archive", url: "/archive" },
    ],
  },
  {
    id: 2,
    title: "Learn",
    children: [
      { id: 21, label: "Stories", url: "/stories" },
      { id: 22, label: "Provenance", url: "/provenance" },
      { id: 23, label: "Curators", url: "/about#curators" },
    ],
  },
  {
    id: 3,
    title: "Support",
    children: [
      { id: 31, label: "Concierge", url: "/concierge" },
      { id: 32, label: "Shipping & Returns", url: "/returns" },
      { id: 33, label: "FAQ", url: "/faq" },
    ],
  },
  {
    id: 4,
    title: "Company",
    children: [
      { id: 41, label: "About", url: "/about" },
      { id: 42, label: "Careers", url: "/careers" },
      { id: 43, label: "Partnerships", url: "/partnerships" },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
              legacyBehavior>
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
