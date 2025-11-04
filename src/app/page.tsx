import Navigation from "./partials/home/navigation";
import Hero from "./partials/home/hero";
import MarketSection from "./partials/home/market-section";
import PreOwnedSection from "./partials/home/pre-owned-section";
import ExploreSection from "./partials/home/explore-section";
import StoriesSection from "./partials/home/stories-section";
import Footer from "./partials/home/footer";

export default function Home() {
  return (
    // <>
    //   <Header />
    //   <main className="my-[50px] sm:my-[72px]">
    //     <ProductListSec
    //       title="NEW ARRIVALS"
    //       data={newArrivalsData}
    //       viewAllLink="/shop#new-arrivals"
    //     />
    //     <div className="max-w-frame mx-auto px-4 xl:px-0">
    //       <hr className="h-px border-t-black/10 my-10 sm:my-16" />
    //     </div>
    //     <SecondaryBanner />
    //     <CategoryHighlights />
    //     <div className="mb-[50px] sm:mb-20">
    //       <ProductListSec
    //         title="top selling"
    //         data={topSellingData}
    //         viewAllLink="/shop#top-selling"
    //       />
    //     </div>
    //     <div className="mb-[50px] sm:mb-20">
    //       <DressStyle />
    //     </div>
    //     <Reviews data={reviewsData} />
    //   </main>
    // </>

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
