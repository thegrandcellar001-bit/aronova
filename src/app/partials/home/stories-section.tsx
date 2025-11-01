import { ArrowRight } from "lucide-react";

const StoriesSection = () => {
  const stories = [
    {
      title: "The Hands Behind the Craft",
      excerpt: "Inside the ateliers shaping Lagos' creative identity.",
      category: "Culture",
    },
    {
      title: "A History in Silver",
      excerpt: "The quiet rise of Nigerian fine jewellery.",
      category: "Heritage",
    },
    {
      title: "The Art of Provenance",
      excerpt: "Why storytelling is the new luxury.",
      category: "Journal",
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-20 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Stories
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Read the journal chronicling the people shaping Nigeria's new
            luxury.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stories.map((story, index) => (
            <article
              key={index}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-3/4 bg-secondary mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xl text-muted-foreground italic px-6 text-center">
                    Story Image
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-gold tracking-[0.2em] uppercase mb-2">
                {story.category}
              </p>
              <h3 className="text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {story.title}
              </h3>
              <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                {story.excerpt}
              </p>
              <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                <span className="font-sans text-sm tracking-wide">
                  Read Story
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
