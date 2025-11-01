import type { Metadata, Viewport } from "next";
import "../../public/css/all.css";
import "@/styles/globals.css";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import HydrationGuard from "@/lib/hydration-guard";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../styles/fonts/Satoshi-Bold.woff2",
      weight: "600",
      style: "bold",
    },
  ],
  variable: "--font-satoshi-bold",
});

export const metadata: Metadata = {
  title: "ARONOVA — Luxury Redefined for Nigeria",
  description:
    "Discover a world where provenance meets beauty — curated Nigerian luxury brands, authenticated designer resale, and bespoke experiences.",
  authors: [
    {
      name: "Aronova",
      url: "https://aronova.com",
    },
  ],
  keywords: [
    "Nigerian luxury",
    "curated fashion Nigeria",
    "authenticated designer resale",
    "bespoke experiences Nigeria",
    "luxury emporium Lagos",
    "high-end Nigerian brands",
    "sustainable luxury Nigeria",
    "Nigerian craftsmanship",
    "exclusive fashion Nigeria",
    "luxury shopping Lagos",
  ],
  metadataBase: new URL("https://aronova.com"),
  twitter: {
    card: "summary_large_image",
    title: "ARONOVA — Luxury Redefined for Nigeria",
    description:
      "Discover a world where provenance meets beauty — curated Nigerian luxury brands, authenticated designer resale, and bespoke experiences.",
    creator: "@aronova",
    images: ["/images/metadata/twitter-card.jpg"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aronova.com",
    title: "ARONOVA — Luxury Redefined for Nigeria",
    description:
      "Discover a world where provenance meets beauty — curated Nigerian luxury brands, authenticated designer resale, and bespoke experiences.",
    images: [
      {
        url: "/images/metadata/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARONOVA Luxury Redefined",
      },
    ],
  },
  icons: {
    icon: "/icons/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={satoshi.variable}>
        <HydrationGuard>
          <HolyLoader color="#C9A227" />
          <Providers>{children}</Providers>
        </HydrationGuard>
        <Toaster />
      </body>
    </html>
  );
}
