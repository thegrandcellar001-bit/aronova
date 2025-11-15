"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ExploreSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${"/images/background/explore-bg.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-slow">
        <p className="font-sans text-sm text-gold tracking-[0.2em] uppercase mb-4">
          Explore
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-cream">
          Discover Experiences <br />
          Beyond the Marketplace
        </h2>
        <p className="font-sans text-lg text-cream/90 mb-10 leading-relaxed max-w-2xl mx-auto">
          Your guide to fine dining, bars, and bespoke concierge experiences.
          Curated with taste and discretion.
        </p>
        <Button
          size="lg"
          className="bg-gold hover:bg-gold/90 text-foreground font-sans tracking-wide px-8 transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/shop")}
        >
          Explore Now
        </Button>
      </div>
    </section>
  );
};

export default ExploreSection;
