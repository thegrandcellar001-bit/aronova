import type { Metadata, Viewport } from "next";
import "../../public/css/all.css";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "./partials/layout/top-banner"; 
import TopNavbar from "./partials/layout/navbar/top";
import Footer from "./partials/layout/footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Aronova",
  description: "Aronova - Find clothes that matches your style",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#C9A227" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
