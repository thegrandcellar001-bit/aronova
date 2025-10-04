import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Fashion Edit",
    desc: "Refined pieces from global ateliers.",
    href: "/discover#fashion",
  },
  {
    title: "Art & Objects",
    desc: "Stories carved, painted, and preserved.",
    href: "/discover#art-objects",
  },
  {
    title: "Home & Design",
    desc: "Spaces elevated by provenance.",
    href: "/discover#home-design",
  },
  {
    title: "Gifting",
    desc: "Meaningful presents, delivered beautifully.",
    href: "/gifting",
  },
];

const CategoryHighlights = () => {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 my-10 sm:my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block border border-black/10 rounded-[16px] p-5 hover:bg-[#F9F9F9] transition-all"
          >
            <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            <p className="text-black/60 text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryHighlights;
