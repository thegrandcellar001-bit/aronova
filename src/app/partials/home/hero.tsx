import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${"/images/background/hero-bg.jpg"})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fade-in-slow">
        <h1 className="text-3xl md:text-6xl lg:text-6xl my-6 text-cream tracking-tight">
          Discover the extraordinary — <br />
          curated, authenticated, and yours.
        </h1>
        <p className="font-sans text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          A global emporium where provenance meets beauty, crafted with
          intention and meaning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-wide px-8 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Explore the Curation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-cream text-primary hover:bg-cream hover:text-foreground font-sans tracking-wide px-8 transition-all duration-300 cursor-pointer"
          >
            Discover Provenance
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-cream/50" />
      </div>
    </section>
  );
};

export default Hero;
