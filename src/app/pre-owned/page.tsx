import { Shield, Award, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";

const PreOwned = () => {
  const products = [
    {
      id: 1,
      brand: "Hermès",
      name: "Birkin 30",
      price: "₦8,500,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
    {
      id: 2,
      brand: "Chanel",
      name: "Classic Flap Medium",
      price: "₦3,200,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
    {
      id: 3,
      brand: "Louis Vuitton",
      name: "Neverfull MM",
      price: "₦1,800,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
    {
      id: 4,
      brand: "Cartier",
      name: "Love Bracelet",
      price: "₦4,500,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
    {
      id: 5,
      brand: "Rolex",
      name: "Datejust 36",
      price: "₦12,000,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
    {
      id: 6,
      brand: "Gucci",
      name: "Jackie 1961",
      price: "₦2,100,000",
      image: "/images/products/placeholder.svg",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/images/hero/preowned-hero.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">
              Pre-Owned, Verified, and Loved.
            </h1>
            <p className="font-sans text-lg text-cream/90 max-w-2xl mx-auto">
              Aronova Resell gives luxury a second life. Each item is
              authenticated, restored, and documented — preserving the story
              behind every piece.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication Steps */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
            How We Authenticate
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Authentication Guarantee
              </h3>
              <p className="text-muted-foreground">
                Every item undergoes rigorous verification by certified luxury
                authenticators.
              </p>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Provenance Certificate
              </h3>
              <p className="text-muted-foreground">
                Complete documentation of origin, ownership history, and
                condition reports.
              </p>
            </div>
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-4">
                Sustainable Luxury
              </h3>
              <p className="text-muted-foreground">
                Extend the lifecycle of exceptional pieces while reducing
                environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Shop Pre-Owned
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="border-gold text-foreground hover:bg-gold/10"
              >
                All Items
              </Button>
              <Button variant="ghost">Designer Bags & Accessories</Button>
              <Button variant="ghost">Watches & Fine Jewellery</Button>
              <Button variant="ghost">Collector Apparel</Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.verified && (
                    <div className="absolute top-4 right-4 bg-deep-green text-cream text-xs px-3 py-1 rounded-full font-sans">
                      ✓ Verified
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {product.brand}
                </p>
                <h3 className="font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans font-semibold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell with Us */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Sell Your Luxury Pieces
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Turn your pre-loved luxury items into value. Our authentication and
            consignment service ensures a seamless, transparent process.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
            <div>
              <div className="font-sans font-semibold text-gold mb-2">
                01. Submit
              </div>
              <p className="text-sm text-muted-foreground">
                Upload photos and details of your item through our secure
                portal.
              </p>
            </div>
            <div>
              <div className="font-sans font-semibold text-gold mb-2">
                02. Verify
              </div>
              <p className="text-sm text-muted-foreground">
                Our experts authenticate and appraise your piece within 48
                hours.
              </p>
            </div>
            <div>
              <div className="font-sans font-semibold text-gold mb-2">
                03. Sell
              </div>
              <p className="text-sm text-muted-foreground">
                Once listed, we handle marketing, sales, and secure payment.
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-foreground"
          >
            Start Selling
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PreOwned;
