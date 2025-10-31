import { Target, Eye, Heart } from "lucide-react";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Provenance",
      description:
        "Every piece tells a story. We document origins, celebrate makers, and ensure transparency.",
    },
    {
      icon: Eye,
      title: "Curation",
      description:
        "We champion quality over quantity — selecting only what meets our standard of excellence.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Building a network of discerning individuals who value craftsmanship and authenticity.",
    },
  ];

  const timeline = [
    {
      year: "2024",
      event: "ARONOVA founded with a vision to redefine luxury for Nigeria.",
    },
    {
      year: "2024",
      event:
        "Launch of our first curated marketplace featuring 15 Nigerian brands.",
    },
    {
      year: "2024",
      event: "Introduction of Pre-Owned authentication and resale service.",
    },
    {
      year: "2025",
      event: "Expansion into experiential curation with Explore and Concierge.",
    },
    {
      year: "2025",
      event: "First ARONOVA Edition launched — celebrating Lagos creativity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/images/hero/about-hero.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center px-6">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-cream">
              Redefining Luxury for Nigeria
            </h1>
            <p className="font-sans text-xl text-cream/90 max-w-2xl">
              ARONOVA is where provenance meets beauty — a marketplace, guide,
              and community for those who value authenticity, craftsmanship, and
              intention.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To build a new luxury paradigm for Nigeria — one rooted in
              transparency, craftsmanship, and cultural pride. Where every
              purchase is an act of patronage, not just consumption.
            </p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To curate exceptional products and experiences that celebrate
              Nigerian creativity, connect discerning buyers with authentic
              makers, and preserve the stories behind every piece.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-gold" />
                </div>
                <h3 className="font-sans font-semibold text-xl mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 px-6 bg-deep-green text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serif text-3xl md:text-4xl italic leading-relaxed">
            "Luxury is not about price — it's about provenance, purpose, and the
            stories we choose to carry forward."
          </blockquote>
          <p className="mt-6 text-gold tracking-wide">— ARONOVA Founder</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
            Our Journey
          </h2>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-24">
                  <div className="font-sans font-semibold text-gold text-xl">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 border-l-2 border-gold/30 pl-8 pb-8">
                  <p className="text-lg text-muted-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Built by Believers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ARONOVA is a team of curators, authenticators, and storytellers
            united by a shared belief: that Nigerian luxury deserves a platform
            as refined as the work itself.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
