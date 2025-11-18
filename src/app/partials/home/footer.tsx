import { Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerLinks = {
    Shop: [
      { title: "Editions", link: "/cat/editions" },
      { title: "Pre-Owned", link: "/cat/pre-owned" },
    ],
    Explore: [{ title: "Concierge", link: "/concierge" }],
    Company: [
      { title: "About", link: "/about" },
      { title: "Contact", link: "/contact" },
      { title: "Terms & Privacy", link: "/terms-privacy" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1440px] w-full mx-auto px-2 lg:px-20 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:justify-center gap-8 lg:gap-12 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-sans font-semibold text-sm tracking-[0.2em] uppercase mb-6">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.link}
                      className="font-sans text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-2xl mb-16">
          <h3 className="text-2xl mb-4">Join Our Circle</h3>
          <p className="font-sans text-sm text-primary-foreground/80 mb-6">
            Receive early access to new editions and experiences.
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-primary-foreground/10 border-2 border-gold/30 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-gold focus-visible:ring-0"
            />
            <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-foreground transition-all duration-300 px-8 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <img
                src="/icons/logo.png"
                alt="ARONOVA"
                className="h-12 w-auto mb-3 mx-auto md:mx-0 brightness-0 invert"
              />
              <p className="font-sans text-xs text-primary-foreground/70">
                © 2025 ARONOVA — Luxury without borders. Provenance in every
                purchase.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
