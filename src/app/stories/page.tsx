import { ArrowRight } from "lucide-react";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";

const Stories = () => {
  const featuredStory = {
    title: "The Artisans of Lagos",
    excerpt:
      "Meet the craftspeople redefining Nigerian luxury — one stitch, one stone, one vision at a time.",
    category: "Craft",
    image: "/images/hero/stories-hero.jpg",
    date: "March 2025",
  };

  const stories = [
    {
      id: 1,
      title: "A New Generation of Nigerian Designers",
      excerpt:
        "How young creatives are building global brands rooted in heritage.",
      category: "Fashion",
      date: "March 2025",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 2,
      title: "The Provenance Movement",
      excerpt:
        "Why knowing where your luxury comes from matters more than ever.",
      category: "Culture",
      date: "February 2025",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 3,
      title: "Inside the Atelier",
      excerpt:
        "A day with the master craftspeople behind Nigeria's finest leather goods.",
      category: "Craft",
      date: "February 2025",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 4,
      title: "The Art of Nigerian Hospitality",
      excerpt:
        "Exploring the philosophy behind Lagos's most refined dining experiences.",
      category: "Lifestyle",
      date: "January 2025",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 5,
      title: "Sustainable Luxury",
      excerpt:
        "How Nigerian brands are pioneering ethical practices in high fashion.",
      category: "Sustainability",
      date: "January 2025",
      image: "/images/products/placeholder.svg",
    },
    {
      id: 6,
      title: "Collector's Edition",
      excerpt: "The rise of investment-worthy Nigerian art and design pieces.",
      category: "Art",
      date: "December 2024",
      image: "/images/products/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Featured Story Hero */}
      <section className="relative h-[70vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredStory.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 h-full flex items-end pb-20 px-6">
          <div className="max-w-4xl mx-auto text-cream animate-fade-in">
            <p className="text-sm text-gold tracking-[0.2em] uppercase mb-4">
              {featuredStory.category} — {featuredStory.date}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              {featuredStory.title}
            </h1>
            <p className="font-sans text-xl text-cream/90 mb-8 max-w-2xl">
              {featuredStory.excerpt}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-gold hover:text-gold/80 transition-colors group"
            >
              <span className="font-sans tracking-wide mr-2">
                Read the Full Story
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              The Journal
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Chronicling the people, places, and ideas shaping Nigeria's new
              luxury landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {stories.map((story, index) => (
              <article
                key={story.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[16/10] mb-6 overflow-hidden rounded-lg bg-cream">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-gold tracking-wide mb-3 uppercase">
                  {story.category} — {story.date}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {story.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-foreground hover:text-primary transition-colors group/link"
                >
                  <span className="font-sans text-sm tracking-wide mr-2">
                    Read Story
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Stories Delivered to Your Inbox
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive our latest journal entries, curated
            recommendations, and exclusive insights.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="px-6 py-3 bg-gold hover:bg-gold/90 text-foreground font-sans rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;
