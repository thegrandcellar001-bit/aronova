import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../partials/home/navigation";
import Footer from "../partials/home/footer";

const Concierge = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-linear-to-b from-cream to-background">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <p className="text-sm text-gold tracking-[0.2em] uppercase mb-4">
            Concierge Service
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
            Your Vision, Our Expertise
          </h1>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
            From bespoke shopping experiences to private dining reservations,
            our concierge service brings your ideas to life with discretion and
            care.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Share your vision, and we'll create a plan to bring it to life.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-sans mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-sans mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-sans mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="+234"
                />
              </div>
              <div>
                <label className="block text-sm font-sans mb-2">
                  Service Type
                </label>
                <select className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold">
                  <option>Select a service</option>
                  <option>Personal Shopping</option>
                  <option>Private Dining</option>
                  <option>Event Curation</option>
                  <option>Art & Culture</option>
                  <option>Travel Coordination</option>
                  <option>Gift Services</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans mb-2">
                Tell Us About Your Request
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                placeholder="Share as much detail as you'd like — dates, preferences, inspiration..."
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-gold hover:bg-gold/90 text-foreground"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Request
            </Button>
          </form>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Or Reach Us Directly</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">concierge@aronova.com</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">+234 (0) 123 456 7890</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Visit</h3>
              <p className="text-muted-foreground">Victoria Island, Lagos</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Concierge;
