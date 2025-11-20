"use client";

import Link from "next/link";
import { Package, RefreshCw, Shield, Truck } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 xl:px-0 pt-28 pb-16">
      <h1 className="text-4xl font-bold mb-2">Shipping & Returns Policy</h1>
      <p className="text-black/60 mb-12">Last Updated: November 20, 2025</p>

      {/* Key Features */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-cream rounded-lg">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-semibold mb-2">Authenticated</h3>
          <p className="text-sm text-black/70">
            Every item is verified for authenticity
          </p>
        </div>
        <div className="text-center p-6 bg-cream rounded-lg">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Truck className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-semibold mb-2">Fast Shipping</h3>
          <p className="text-sm text-black/70">
            On our express shipping method
          </p>
        </div>
        <div className="text-center p-6 bg-cream rounded-lg">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <RefreshCw className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-semibold mb-2">14-Day Returns</h3>
          <p className="text-sm text-black/70">Easy return process</p>
        </div>
        <div className="text-center p-6 bg-cream rounded-lg">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Package className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-semibold mb-2">Secure Packaging</h3>
          <p className="text-sm text-black/70">Premium protective packaging</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none space-y-10">
        {/* Shipping Policy */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 pb-3 border-b border-black/10">
            Shipping Policy
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Shipping Methods & Delivery Times
              </h3>
              <p className="text-black/80 leading-relaxed mb-4">
                We offer multiple shipping options to meet your needs. All
                orders are processed within 1-2 business days (excluding
                weekends and holidays) after receiving your order confirmation
                email.
              </p>

              <div className="bg-cream/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start border-b border-black/10 pb-4">
                  <div>
                    <h4 className="font-semibold text-black">
                      Standard Delivery
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      3-5 business days within Lagos
                    </p>
                    <p className="text-sm text-black/70">
                      5-7 business days nationwide
                    </p>
                  </div>
                  <span className="font-semibold text-gold">₦5,000</span>
                </div>
                <div className="flex justify-between items-start pb-2">
                  <div>
                    <h4 className="font-semibold text-black">
                      Express Delivery
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      1-2 business days within Lagos
                    </p>
                    <p className="text-sm text-black/70">
                      2-3 business days nationwide
                    </p>
                  </div>
                  <span className="font-semibold text-gold">₦10,000</span>
                </div>
                {/* <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-black">
                      Free Standard Shipping
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      On all orders over ₦50,000
                    </p>
                  </div>
                  <span className="font-semibold text-green-600">FREE</span>
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Order Tracking</h3>
              <p className="text-black/80 leading-relaxed mb-3">
                Once your order has shipped, you will receive a confirmation
                email with a tracking number. You can track your order status at
                any time by:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>
                  Visiting your{" "}
                  <Link
                    href="/account/orders"
                    className="text-gold underline hover:text-gold/80"
                  >
                    Order History
                  </Link>{" "}
                  page
                </li>
                <li>
                  Using the tracking link provided in your shipping confirmation
                  email
                </li>
                <li>Contacting our concierge team for assistance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                International Shipping
              </h3>
              <p className="text-black/80 leading-relaxed mb-3">
                We currently ship to select international destinations.
                International shipping rates and delivery times vary by location
                and will be calculated at checkout.
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>
                  International orders may be subject to customs duties, taxes,
                  and fees
                </li>
                <li>These charges are the responsibility of the recipient</li>
                <li>
                  Delivery times are estimates and may be affected by customs
                  processing
                </li>
                <li>
                  Contact us for specific international shipping inquiries
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Shipping Restrictions
              </h3>
              <p className="text-black/80 leading-relaxed">
                We are unable to ship to P.O. boxes or APO/FPO addresses. Please
                ensure you provide a complete physical address for delivery. We
                are not responsible for orders shipped to incorrect addresses
                provided by the customer.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 pb-3 border-b border-black/10">
            Returns Policy
          </h2>

          <div className="space-y-6">
            <div className="bg-gold/5 border-l-4 border-gold p-6 rounded-r-lg">
              <p className="text-black/90 leading-relaxed">
                <strong>Our Promise:</strong> Every Aronova product is
                authenticated, inspected, and certified before delivery. If your
                purchase does not meet your expectations, you may return it
                within 14 days of delivery. Our concierge team will arrange
                collection and ensure the process is seamless.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Return Eligibility</h3>
              <p className="text-black/80 leading-relaxed mb-4">
                To be eligible for a return, items must meet the following
                conditions:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>Items must be returned within 14 days of delivery</li>
                <li>
                  Items must be unused, unworn, and in their original condition
                </li>
                <li>All original tags, labels, and packaging must be intact</li>
                <li>
                  Items must be in their original packaging with all accessories
                  included
                </li>
                <li>
                  Proof of purchase (order confirmation or receipt) must be
                  provided
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Non-Returnable Items
              </h3>
              <p className="text-black/80 leading-relaxed mb-3">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>Personalized or custom-made items</li>
                <li>
                  Items marked as "Final Sale" or "Non-Returnable" at the time
                  of purchase
                </li>
                <li>
                  Intimate apparel, swimwear, and earrings (for hygiene reasons)
                </li>
                <li>Items that show signs of wear, damage, or alteration</li>
                <li>Items returned without original packaging or tags</li>
                <li>Sale items (unless defective or damaged upon arrival)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                How to Initiate a Return
              </h3>
              <p className="text-black/80 leading-relaxed mb-4">
                Starting a return is simple and hassle-free:
              </p>
              <ol className="list-decimal pl-6 text-black/80 space-y-3">
                <li>
                  <strong>Log in to your account</strong> and navigate to your{" "}
                  <Link
                    href="/account/orders"
                    className="text-gold underline hover:text-gold/80"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <strong>Select the order</strong> containing the item(s) you
                  wish to return
                </li>
                <li>
                  <strong>Click "Request Return"</strong> and select the item(s)
                  and reason for return
                </li>
                <li>
                  <strong>Submit your request</strong> - Our concierge team will
                  review and approve within 24 hours
                </li>
                <li>
                  <strong>Receive return instructions</strong> via email with a
                  prepaid shipping label (if applicable)
                </li>
                <li>
                  <strong>Pack your item(s)</strong> securely in the original
                  packaging
                </li>
                <li>
                  <strong>Schedule pickup</strong> or drop off at the designated
                  location
                </li>
              </ol>
              <p className="text-black/80 leading-relaxed mt-4">
                Alternatively, you can contact our concierge team directly at{" "}
                <a
                  href="mailto:support@thearonova.com"
                  className="text-gold underline hover:text-gold/80"
                >
                  support@thearonova.com
                </a>{" "}
                or call +234 (0) 123 456 7890 for assistance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Return Shipping</h3>
              <p className="text-black/80 leading-relaxed mb-3">
                Return shipping is handled as follows:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>
                  <strong>Free returns within Nigeria:</strong> We provide a
                  prepaid return label for all eligible returns
                </li>
                <li>
                  <strong>International returns:</strong> Customers are
                  responsible for return shipping costs unless the item is
                  defective or we made an error
                </li>
                <li>
                  <strong>Defective or damaged items:</strong> We cover all
                  return shipping costs and will send a replacement or issue a
                  full refund
                </li>
                <li>
                  Our concierge team can arrange pickup from your location for
                  added convenience
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Refund Processing</h3>
              <p className="text-black/80 leading-relaxed mb-4">
                Once we receive your return, our team will inspect the item(s)
                to ensure they meet our return criteria.
              </p>
              <div className="bg-cream/50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gold font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Inspection (1-2 business days)
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      We verify the item meets return eligibility requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gold font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Approval & Notification (Same day)
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      You'll receive an email confirming your refund approval
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gold font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Refund Processing (7-14 business days)
                    </h4>
                    <p className="text-sm text-black/70 mt-1">
                      Refund is processed to your original payment method. The
                      time it takes for the refund to appear depends on your
                      bank or card issuer
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-black/80 leading-relaxed mt-4">
                <strong>Note:</strong> Original shipping charges are
                non-refundable unless the return is due to our error or a
                defective product.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Exchanges</h3>
              <p className="text-black/80 leading-relaxed mb-3">
                We currently do not offer direct exchanges. If you would like a
                different size, color, or item:
              </p>
              <ol className="list-decimal pl-6 text-black/80 space-y-2">
                <li>Return the original item following our return process</li>
                <li>Place a new order for the desired item</li>
                <li>
                  We'll process your return and refund as quickly as possible
                </li>
              </ol>
              <p className="text-black/80 leading-relaxed mt-3">
                For urgent exchanges, please contact our concierge team, and
                we'll do our best to expedite the process.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Damaged or Defective Items
              </h3>
              <p className="text-black/80 leading-relaxed mb-3">
                If you receive a damaged or defective item, please contact us
                immediately:
              </p>
              <ul className="list-disc pl-6 text-black/80 space-y-2">
                <li>
                  Email us at support@thearonova.com within 48 hours of delivery
                </li>
                <li>
                  Include your order number and photos of the damaged/defective
                  item
                </li>
                <li>
                  We will arrange for a replacement or full refund, including
                  shipping costs
                </li>
                <li>
                  No need to return the item until we provide instructions
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Care Instructions */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 pb-3 border-b border-black/10">
            Product Care
          </h2>

          <div className="space-y-6">
            <p className="text-black/80 leading-relaxed">
              To ensure your Aronova pieces remain in pristine condition, please
              follow these care guidelines:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cream/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Clothing & Textiles
                </h3>
                <ul className="text-sm text-black/80 space-y-2">
                  <li>• Always check the care label before cleaning</li>
                  <li>• Dry clean delicate fabrics and luxury items</li>
                  <li>
                    • Store in a cool, dry place away from direct sunlight
                  </li>
                  <li>• Use padded hangers for structured garments</li>
                  <li>• Keep away from perfumes and harsh chemicals</li>
                </ul>
              </div>

              <div className="bg-cream/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Leather & Accessories
                </h3>
                <ul className="text-sm text-black/80 space-y-2">
                  <li>• Clean with a soft, dry cloth regularly</li>
                  <li>• Use leather conditioner to maintain suppleness</li>
                  <li>• Avoid exposure to water and extreme temperatures</li>
                  <li>• Store in dust bags when not in use</li>
                  <li>• Keep away from sharp objects and rough surfaces</li>
                </ul>
              </div>

              <div className="bg-cream/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Jewelry & Watches
                </h3>
                <ul className="text-sm text-black/80 space-y-2">
                  <li>• Remove before swimming, bathing, or exercising</li>
                  <li>• Clean with a jewelry polishing cloth</li>
                  <li>• Store separately to prevent scratching</li>
                  <li>• Have watches serviced regularly by professionals</li>
                  <li>• Avoid contact with cosmetics and chemicals</li>
                </ul>
              </div>

              <div className="bg-cream/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Footwear</h3>
                <ul className="text-sm text-black/80 space-y-2">
                  <li>• Use shoe trees to maintain shape</li>
                  <li>• Clean and condition leather regularly</li>
                  <li>• Rotate pairs to allow proper drying</li>
                  <li>• Protect soles with rubber sole guards</li>
                  <li>• Store in original boxes or dust bags</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 pb-3 border-b border-black/10">
            Need Help?
          </h2>

          <p className="text-black/80 leading-relaxed mb-6">
            Our concierge team is here to assist you with any questions about
            shipping, returns, or product care. We're committed to providing you
            with a seamless and luxurious experience.
          </p>

          <div className="bg-cream rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Contact Our Concierge Team
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-gold font-semibold mb-2">Email</div>
                <a
                  href="mailto:support@thearonova.com"
                  className="text-black/80 hover:text-gold underline"
                >
                  support@thearonova.com
                </a>
              </div>
              <div className="text-center">
                <div className="text-gold font-semibold mb-2">Phone</div>
                <a
                  href="tel:+2340123456789"
                  className="text-black/80 hover:text-gold"
                >
                  +234 (0) 123 456 7890
                </a>
              </div>
              <div className="text-center">
                <div className="text-gold font-semibold mb-2">Hours</div>
                <p className="text-black/80">Mon-Sat: 9AM - 6PM WAT</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-black/60 text-sm text-center">
            This policy is subject to change. Please review it periodically for
            updates. For complete terms, please see our{" "}
            <Link
              href="/terms"
              className="text-gold underline hover:text-gold/80"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
