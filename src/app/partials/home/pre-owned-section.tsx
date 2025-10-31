import { Shield, Award, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreOwnedSection = () => {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-20 bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Pre-Owned, <br />Verified, and Loved.
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
              Authenticated designer resale — verified, loved, and reborn. Aronova Resell gives luxury a second life with integrity intact.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-start">
                <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-1">Authentication Guarantee</h3>
                  <p className="font-sans text-muted-foreground">Every piece verified by experts</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-1">Provenance Certificate</h3>
                  <p className="font-sans text-muted-foreground">Digital documentation of authenticity</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <RefreshCw className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-1">Sustainable Luxury</h3>
                  <p className="font-sans text-muted-foreground">Elegance with transparency</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-wide"
              >
                Shop Pre-Owned
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-sans tracking-wide"
              >
                Sell Your Piece
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-[600px] bg-muted animate-scale-in">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-2xl text-muted-foreground italic px-8 text-center">
                "Luxury deserves a second life — with integrity intact."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOwnedSection;
