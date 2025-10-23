"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsDesktop(width >= 768);
    };

    // Initial check
    handleResize();

    // Update on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main>
      <div className="w-full">
        {isDesktop && (
          <Image
            src="/images/aronova-cs.png"
            alt="Aronova Coming Soon"
            width={300}
            height={250}
            quality={100}
            className="absolute w-full"
          />
        )}

        {isMobile && (
          <Image
            src="/images/aronova-cs-mobile.png"
            alt="Aronova Coming Soon"
            width={600}
            height={400}
            quality={100}
            className="absolute w-full"
          />
        )}
      </div>
    </main>
  );
}
