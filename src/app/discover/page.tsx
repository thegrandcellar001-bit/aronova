"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";

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
          style={{ backgroundImage: `url(${"/images/hero/explore-hero.jpg"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">
              Discover Lagos, Refined
            </h1>
            <p className="font-sans text-lg text-cream/90 max-w-2xl mx-auto">
              Your guide to fine dining, bars, and bespoke experiences. Curated
              with taste and discretion.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "bg-gold hover:bg-gold/90 text-foreground"
                    : ""
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredVenues.map((venue, index) => (
              <div
                key={venue.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-lg">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <div className="text-sm text-gold mb-2">
                      {venue.category}
                    </div>
                    <h3 className="text-2xl mb-2">{venue.name}</h3>
                    <p className="text-sm text-cream/80 mb-3">
                      {venue.description}
                    </p>
                    <div className="flex items-center text-sm text-cream/70">
                      <MapPin className="w-4 h-4 mr-2" />
                      {venue.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              className="bg-gold hover:bg-gold/90 text-foreground"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Request Concierge
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cream text-primary hover:bg-cream/10 hover:text-white"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discover;
