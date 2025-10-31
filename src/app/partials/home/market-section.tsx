const MarketSection = () => {
  const products = [
    {
      image: "/images/products/product-1.jpg",
      brand: "ALÁRA",
      name: "Heritage Leather Tote",
      price: "₦450,000",
    },
    {
      image: "/images/products/product-2.jpg",
      name: "Artisan Gold Necklace",
      brand: "Temple Muse",
      price: "₦320,000",
    },
    {
      image: "/images/products/product-3.jpg",
      brand: "Lisa Folawiyo",
      name: "Ankara Luxury Scarf",
      price: "₦180,000",
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-20 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            The Market
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked Nigerian brands redefining craftsmanship for the global
            stage.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden mb-4 bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-sm text-muted-foreground tracking-wider uppercase">
                  {product.brand}
                </p>
                <h3 className="font-serif text-xl text-foreground">
                  {product.name}
                </h3>
                <p className="font-sans text-foreground font-medium">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
