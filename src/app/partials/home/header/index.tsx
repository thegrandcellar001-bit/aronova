import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

const Header = () => {
  return (
    <header className="bg-[#F2F0F1] overflow-hidden pb-0">
      <section className="relative bg-cover bg-top xl:bg-position-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/hero-bg.jpg')] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] flex flex-col justify-center items-center text-white text-center px-4 md:px-8 lg:px-0">
        <motion.h2
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-2xl lg:text-5xl lg:leading-[64px] mb-5 lg:mb-8",
          ])}
        >
          Discover the extraordinary : curated, authenticated and yours.
        </motion.h2>
        <motion.p
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl mb-6 lg:mb-8 max-w-[545px]"
        >
          A global emporium where provenance meets beauty, crafted with
          intention and meaning.
        </motion.p>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center gap-x-3"
        >
          <Link
            href="/discover"
            className="w-fit mb-5 md:mb-12 inline-block text-center bg-secondary hover:bg-secondary/80 transition-all text-white font-semibold px-14 py-4 rounded-md hover:animate-pulse"
          >
            Explore the curation →
          </Link>
          <Link
            href="/discover"
            className="w-fit mb-5 md:mb-12 inline-block text-center bg-white hover:bg-transparent hover:ring-2 hover:ring-white hover:text-white transition-all text-secondary font-semibold px-14 py-4 rounded-md hover:animate-pulse"
          >
            Discover provenance →
          </Link>
        </motion.div>
      </section>
      {/* <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-position-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/hero-bg.jpg')] md:bg-[url('/images/hero-bg.jpg')]"
        >
          <Image
            priority
            src="/icons/big-star.svg"
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-12 max-w-[76px] max-h-[76px] lg:max-w-24 lg:max-h-max-w-24 xl:max-w-[104px] xl:max-h-[104px] animate-[spin_4s_infinite]"
          />
          <Image
            priority
            src="/icons/small-star.svg"
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56 max-w-11 max-h-11 md:max-w-14 md:max-h-14 animate-[spin_3s_infinite]"
          />
        </motion.section> */}
    </header>
  );
};

export default Header;
