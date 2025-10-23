import ProductListSec from "@/components/common/ProductListSec";
import Brands from "./partials/home/brands";
import DressStyle from "./partials/home/dress-style";
import Header from "./partials/home/header";
import Reviews from "./partials/home/reviews";
import SecondaryBanner from "./partials/home/secondary-banner";
import CategoryHighlights from "./partials/home/category-highlights";
import { newArrivalsData, topSellingData } from "@/lib/data/products";
import { reviewsData } from "@/lib/data/reviews";

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-px border-t-black/10 my-10 sm:my-16" />
        </div>
        <SecondaryBanner />
        <CategoryHighlights />
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
