"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 xl:px-0 pt-28 pb-16">
      <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
      <p className="text-black/60 mb-8">Last Updated: November 20, 2025</p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-black/80 leading-relaxed mb-4">
            Welcome to Aronova. These Terms and Conditions ("Terms") govern your
            access to and use of the Aronova website, mobile application, and
            related services (collectively, the "Platform"). By accessing or
            using our Platform, you agree to be bound by these Terms. If you do
            not agree to these Terms, please do not use our Platform.
          </p>
          <p className="text-black/80 leading-relaxed">
            Aronova is an e-commerce platform that offers curated, authenticated
            luxury goods and premium products. We reserve the right to modify
            these Terms at any time, and such modifications will be effective
            immediately upon posting. Your continued use of the Platform
            constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Account Registration
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            To make purchases on Aronova, you must create an account. You agree
            to:
          </p>
          <ul className="list-disc pl-6 text-black/80 space-y-2">
            <li>
              Provide accurate, current, and complete information during
              registration
            </li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>
              Accept responsibility for all activities that occur under your
              account
            </li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>
          <p className="text-black/80 leading-relaxed mt-4">
            You must be at least 18 years old to create an account and make
            purchases. We reserve the right to refuse service, terminate
            accounts, or cancel orders at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Product Information and Availability
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            We strive to provide accurate product descriptions, images, and
            pricing. However:
          </p>
          <ul className="list-disc pl-6 text-black/80 space-y-2">
            <li>
              Product images are for illustrative purposes and may differ
              slightly from the actual product
            </li>
            <li>
              We do not warrant that product descriptions or other content is
              accurate, complete, or error-free
            </li>
            <li>
              All products are subject to availability and may be discontinued
              at any time
            </li>
            <li>
              We reserve the right to limit quantities purchased per person or
              per order
            </li>
          </ul>
          <p className="text-black/80 leading-relaxed mt-4">
            Every Aronova product is authenticated, inspected, and certified
            before delivery to ensure quality and authenticity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Pricing and Payment
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            All prices are displayed in the currency specified on the Platform
            and are subject to change without notice. Prices include applicable
            taxes unless otherwise stated. Payment is due at the time of
            purchase.
          </p>
          <p className="text-black/80 leading-relaxed mb-4">
            We accept various payment methods as indicated during checkout. By
            providing payment information, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 text-black/80 space-y-2">
            <li>You are authorized to use the payment method provided</li>
            <li>The information you provide is accurate and complete</li>
            <li>
              You will pay all charges incurred at the prices in effect when
              such charges are incurred
            </li>
          </ul>
          <p className="text-black/80 leading-relaxed mt-4">
            We reserve the right to refuse or cancel any order if fraud or an
            unauthorized transaction is suspected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Order Acceptance and Confirmation
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            Your receipt of an order confirmation does not constitute our
            acceptance of your order. We reserve the right to accept or decline
            your order for any reason, including product availability, errors in
            pricing or product information, or suspected fraudulent activity.
          </p>
          <p className="text-black/80 leading-relaxed">
            Once your order is accepted, you will receive a confirmation email
            with your order details and tracking information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Shipping and Delivery
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            We offer various shipping options as displayed during checkout.
            Delivery times are estimates and not guaranteed. We are not liable
            for delays caused by shipping carriers or circumstances beyond our
            control.
          </p>
          <p className="text-black/80 leading-relaxed mb-4">
            Risk of loss and title for products pass to you upon delivery to the
            shipping carrier. You are responsible for providing accurate
            shipping information. We are not responsible for orders shipped to
            incorrect addresses provided by you.
          </p>
          <p className="text-black/80 leading-relaxed">
            International orders may be subject to customs duties, taxes, and
            fees, which are the responsibility of the recipient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Returns and Refunds
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            If your purchase does not meet your expectations, you may return it
            within 14 days of delivery. To be eligible for a return:
          </p>
          <ul className="list-disc pl-6 text-black/80 space-y-2">
            <li>
              Products must be unused, unworn, and in original condition with
              all tags attached
            </li>
            <li>Products must be in their original packaging</li>
            <li>
              You must initiate the return process through your account or by
              contacting our concierge team
            </li>
            <li>
              Certain products may be non-returnable as indicated at the time of
              purchase
            </li>
          </ul>
          <p className="text-black/80 leading-relaxed mt-4">
            Our concierge team will arrange collection and ensure the return
            process is seamless. Refunds will be processed to the original
            payment method within 7-14 business days after we receive and
            inspect the returned product.
          </p>
          <p className="text-black/80 leading-relaxed mt-4">
            For more details, please visit our{" "}
            <Link
              href="/returns"
              className="text-gold underline hover:text-gold/80"
            >
              Returns & Care
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Intellectual Property Rights
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            All content on the Platform, including text, graphics, logos,
            images, videos, and software, is the property of Aronova or its
            licensors and is protected by copyright, trademark, and other
            intellectual property laws.
          </p>
          <p className="text-black/80 leading-relaxed">
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, or exploit any content from the Platform
            without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. User Conduct</h2>
          <p className="text-black/80 leading-relaxed mb-4">
            You agree not to use the Platform to:
          </p>
          <ul className="list-disc pl-6 text-black/80 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>
              Transmit any harmful, threatening, abusive, or offensive content
            </li>
            <li>Interfere with or disrupt the Platform or servers</li>
            <li>
              Attempt to gain unauthorized access to any portion of the Platform
            </li>
            <li>
              Use automated systems to access the Platform without our
              permission
            </li>
            <li>Engage in any fraudulent activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            10. Reviews and User Content
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            You may have the opportunity to submit reviews, ratings, and other
            content. By submitting content, you grant Aronova a non-exclusive,
            royalty-free, perpetual, and worldwide license to use, reproduce,
            modify, and display such content.
          </p>
          <p className="text-black/80 leading-relaxed">
            You represent that any content you submit is accurate, does not
            violate any third-party rights, and complies with these Terms. We
            reserve the right to remove any content that violates these Terms or
            is otherwise objectionable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            11. Privacy and Data Protection
          </h2>
          <p className="text-black/80 leading-relaxed">
            Your use of the Platform is also governed by our Privacy Policy,
            which describes how we collect, use, and protect your personal
            information. By using the Platform, you consent to our collection
            and use of your information as described in the Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            12. Disclaimer of Warranties
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            THE PLATFORM AND ALL PRODUCTS ARE PROVIDED "AS IS" AND "AS
            AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, ARONOVA DISCLAIMS
            ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="text-black/80 leading-relaxed">
            We do not warrant that the Platform will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            13. Limitation of Liability
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            TO THE FULLEST EXTENT PERMITTED BY LAW, ARONOVA SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
            DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES.
          </p>
          <p className="text-black/80 leading-relaxed">
            Our total liability to you for any claims arising from your use of
            the Platform or any products purchased shall not exceed the amount
            you paid for the product or service giving rise to the claim, or
            $100, whichever is greater.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Indemnification</h2>
          <p className="text-black/80 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Aronova and its
            officers, directors, employees, and agents from any claims,
            liabilities, damages, losses, and expenses, including reasonable
            attorneys' fees, arising out of or in any way connected with your
            access to or use of the Platform, your violation of these Terms, or
            your infringement of any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            15. Governing Law and Dispute Resolution
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of Nigeria, without regard to its conflict of law
            provisions.
          </p>
          <p className="text-black/80 leading-relaxed">
            Any disputes arising from these Terms or your use of the Platform
            shall be resolved through binding arbitration in Lagos, Nigeria,
            except that either party may seek injunctive relief in court. You
            waive any right to participate in a class action lawsuit or
            class-wide arbitration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">16. Termination</h2>
          <p className="text-black/80 leading-relaxed">
            We may terminate or suspend your account and access to the Platform
            immediately, without prior notice or liability, for any reason,
            including if you breach these Terms. Upon termination, your right to
            use the Platform will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">17. Severability</h2>
          <p className="text-black/80 leading-relaxed">
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary, and the remaining provisions shall remain
            in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">18. Entire Agreement</h2>
          <p className="text-black/80 leading-relaxed">
            These Terms, together with our Privacy Policy and any other legal
            notices published on the Platform, constitute the entire agreement
            between you and Aronova regarding your use of the Platform and
            supersede all prior agreements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            19. Contact Information
          </h2>
          <p className="text-black/80 leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <div className="bg-cream rounded-lg p-6 space-y-3">
            <p className="text-black/80">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@thearonova.com"
                className="text-gold underline hover:text-gold/80"
              >
                support@thearonova.com
              </a>
            </p>
            <p className="text-black/80">
              <strong>Phone:</strong> +234 (0) 123 456 7890
            </p>
            <p className="text-black/80">
              <strong>Address:</strong> Victoria Island, Lagos, Nigeria
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-black/60 text-sm">
            By using the Aronova Platform, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </main>
  );
}
