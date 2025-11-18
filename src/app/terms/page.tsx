"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function TermsPage() {
  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 pt-28 pb-10">
      <h1 className="text-3xl font-bold mb-4">Your Curator, Always On Hand.</h1>
      <ul className="list-disc pl-6 text-black/80 space-y-2 mb-6">
        <li>
          <Link href="/account/orders" className="underline">
            Track My Order <i className="far fa-arrow-right ml-1"></i>
          </Link>
        </li>
        <li>
          <a href="/returns" className="underline">
            Returns & Care <i className="far fa-arrow-right ml-1"></i>
          </a>
        </li>
      </ul>
      <p className="text-black/70 max-w-4xl">
        Every Aronova object is authenticated, inspected, and certified before
        delivery. If your discovery does not meet your expectations, you may
        return it within 14 days. Our concierge team will arrange collection and
        ensure the process is seamless.
      </p>

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Or Reach Us Directly</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">support@thearonova.com</p>
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
      </div>
    </main>
  );
}
