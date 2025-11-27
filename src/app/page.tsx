import Hero from "./partials/home/hero";
import MarketSection from "./partials/home/market-section";
import PreOwnedSection from "./partials/home/pre-owned-section";
import ExploreSection from "./partials/home/explore-section";
import StoriesSection from "./partials/home/stories-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <Hero />
        <MarketSection />
        <PreOwnedSection />
        <ExploreSection />
        <StoriesSection />

        {/* Bottom Tagline */}
        <section className="py-20 bg-foreground text-background">
          <div className="text-center px-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Curated for discovery. <br />
              Authenticated with provenance.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
