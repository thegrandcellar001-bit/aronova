"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";
import Link from "next/link";

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Restaurants",
    "Bars",
    "Lounges",
    "Hotels",
    "Experiences",
  ];

  const venues = [
    {
      id: 1,
      name: "Nok by Alara",
      category: "Restaurant",
      location: "Victoria Island, Lagos",
      description: "Contemporary Nigerian cuisine meets refined dining.",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 2,
      name: "The George",
      category: "Hotel",
      location: "Ikoyi, Lagos",
      description: "Boutique luxury in the heart of Lagos.",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 3,
      name: "Terra Kulture",
      category: "Restaurant",
      location: "Victoria Island, Lagos",
      description: "Nigerian art, culture, and cuisine.",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 4,
      name: "Whiskey Bar",
      category: "Bar",
      location: "Lekki Phase 1, Lagos",
      description: "Premium spirits in an intimate setting.",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 5,
      name: "Circa Non Pareil",
      category: "Lounge",
      location: "Lekki, Lagos",
      description: "Where luxury meets Lagos nightlife.",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 6,
      name: "Art & Heritage Tour",
      category: "Experience",
      location: "Lagos & Beyond",
      description: "Curated journeys through Nigerian art and culture.",
      image: "/images/products/placeholder.svg",
    },
  ];

  const filteredVenues =
    activeFilter === "All"
      ? venues
      : venues.filter((venue) => venue.category === activeFilter.slice(0, -1));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/images/hero/discover-hero.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">
              Discover Luxury
            </h1>
            <p className="font-sans text-lg text-cream/90 max-w-2xl mx-auto">
              Specially curated products and experiences that define luxury
              living.
            </p>
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-20 px-6 bg-deep-green text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Need Something More Bespoke?
          </h2>
          <p className="text-lg text-cream/90 mb-8 max-w-2xl mx-auto">
            Our concierge service curates personalized experiences — from
            private dining to exclusive access. Tell us what you envision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-foreground cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Request Concierge
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cream text-primary hover:bg-cream/10 hover:text-white"
              asChild
            >
              <Link href="tel:+1234567890">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;
