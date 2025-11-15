"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

const videos = [
  {
    src: "/videos/hero-video.webm",
    poster: "/images/background/hero-bg.jpg",
    caption: "Discover the extraordinary — curated, authenticated, and yours.",
  },
  {
    src: "/videos/hero-video-2.webm",
    poster: "/images/background/hero-bg-2.jpg",
    caption: "Experience timeless beauty, crafted with provenance and purpose.",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <Carousel
        className="absolute inset-0"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem key={index} className="relative h-screen">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
                poster={video.poster}
                autoPlay
              >
                <source src={video.src} type="video/webm" />
                <img
                  src={video.poster}
                  alt="Hero Background"
                  className="w-full h-full object-cover"
                />
              </video>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fade-in-slow">
        <h1 className="text-3xl md:text-6xl lg:text-6xl my-6 text-cream tracking-tight">
          {videos[activeIndex].caption}
        </h1>
        <p className="font-sans text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          A global emporium where provenance meets beauty, crafted with
          intention and meaning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-wide px-8 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => router.push("/shop")}
          >
            Explore the Curation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-cream text-primary hover:bg-cream hover:text-foreground font-sans tracking-wide px-8 transition-all duration-300 cursor-pointer"
            onClick={() => router.push("/discover")}
          >
            Discover Provenance
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-px h-12 bg-cream/50" />
      </div>
    </section>
  );
}
