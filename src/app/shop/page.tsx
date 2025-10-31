import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Shop = () => {
  const products = [
    {
      id: 1,
      image: "/images/products/product-1.jpg",
      brand: "LAGOS LUXURY",
      name: "Handcrafted Leather Tote",
      price: "₦285,000",
      category: "Accessories",
    },
    {
      id: 2,
      image: "/images/products/product-2.jpg",
      name: "Heritage Gold Necklace",
      brand: "ADIRE HERITAGE",
      price: "₦420,000",
      category: "Jewelry",
    },
    {
      id: 3,
      image: "/images/products/product-3.jpg",
      brand: "OKE TEXTILES",
      name: "Silk Aso-Oke Fabric",
      price: "₦175,000",
      category: "Textiles",
    },
    {
      id: 4,
      image: "/images/products/product-1.jpg",
      brand: "LAGOS LUXURY",
      name: "Handcrafted Leather Tote",
      price: "₦285,000",
      category: "Accessories",
    },
    {
      id: 5,
      image: "/images/products/product-2.jpg",
      name: "Heritage Gold Necklace",
      brand: "ADIRE HERITAGE",
      price: "₦420,000",
      category: "Jewelry",
    },
    {
      id: 6,
      image: "/images/products/product-3.jpg",
      brand: "OKE TEXTILES",
      name: "Silk Aso-Oke Fabric",
      price: "₦175,000",
      category: "Textiles",
    },
    {
      id: 7,
      image: "/images/products/product-1.jpg",
      brand: "LAGOS LUXURY",
      name: "Handcrafted Leather Tote",
      price: "₦285,000",
      category: "Accessories",
    },
    {
      id: 8,
      image: "/images/products/product-2.jpg",
      name: "Heritage Gold Necklace",
      brand: "ADIRE HERITAGE",
      price: "₦420,000",
      category: "Jewelry",
    },
  ];

  const categories = [
    "All",
    "Accessories",
    "Jewelry",
    "Textiles",
    "Fashion",
    "Art",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            <h1 className="font-serif text-5xl lg:text-6xl mb-6 animate-fade-in">
              The Market
            </h1>
            <p className="font-sans text-lg text-primary-foreground/90 max-w-2xl animate-fade-in-slow">
              Discover exceptional pieces from Nigeria's most celebrated
              artisans and luxury brands.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b border-border bg-background sticky top-20 z-40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "ghost"}
                    size="sm"
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer animate-fade-in"
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {product.brand}
                    </p>
                    <h3 className="font-sans text-base text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans font-semibold text-foreground">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-16">
              <Button variant="outline" size="lg" className="px-12">
                Load More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
