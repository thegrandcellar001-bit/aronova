import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Editions = () => {
  const editions = [
    {
      id: 1,
      image: "/images/products/product-1.jpg",
      title: "Heritage Collection 2025",
      description:
        "A curated selection celebrating Nigeria's textile heritage with contemporary interpretations.",
      pieces: "Limited to 50 pieces",
      status: "Available Now",
      price: "From ₦450,000",
    },
    {
      id: 2,
      image: "/images/products/product-2.jpg",
      title: "Artisan Collaboration Series",
      description:
        "Exclusive pieces co-created with master craftspeople from across Nigeria.",
      pieces: "Limited to 30 pieces",
      status: "Pre-Order",
      price: "From ₦680,000",
    },
    {
      id: 3,
      image: "/images/products/product-3.jpg",
      title: "Contemporary Lagos",
      description:
        "Modern luxury pieces inspired by the vibrant energy of Lagos.",
      pieces: "Limited to 75 pieces",
      status: "Coming Soon",
      price: "From ₦320,000",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-7xl mb-8 animate-fade-in">
                Curated Editions
              </h1>
              <p className="font-sans text-lg lg:text-xl text-primary-foreground/90 mb-8 animate-fade-in-slow">
                Each edition is a carefully curated collection that tells a
                story of Nigerian craftsmanship, heritage, and contemporary
                luxury. Every piece is numbered, authenticated, and comes with
                provenance documentation.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 animate-scale-in bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-primary"
              >
                View All Collections
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Editions Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
            <div className="space-y-32">
              {editions.map((edition, index) => (
                <div
                  key={edition.id}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    } animate-fade-in`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={edition.image}
                        alt={edition.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div
                    className={`${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    } space-y-6 animate-fade-in-slow`}
                  >
                    <div className="inline-block px-4 py-2 border border-gold text-gold text-xs font-sans tracking-[0.2em] uppercase">
                      {edition.status}
                    </div>
                    <h2 className="text-3xl lg:text-4xl text-foreground">
                      {edition.title}
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                      {edition.description}
                    </p>
                    <div className="space-y-3 pt-4">
                      <p className="font-sans text-sm text-foreground">
                        <span className="text-muted-foreground">
                          Edition Size:
                        </span>{" "}
                        {edition.pieces}
                      </p>
                      <p className="font-sans text-xl font-semibold text-foreground">
                        {edition.price}
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button className="gap-2">
                        Explore Collection
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-muted py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-4xl lg:text-5xl mb-6 text-foreground">
              Be First to Know
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to receive early access to new editions and exclusive
              pre-order opportunities.
            </p>
            <Button size="lg" className="gap-2">
              Join Our Circle
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Editions;
