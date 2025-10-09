"use client";

import { useAuthStore } from "@/lib/stores/auth";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";
import Image from "next/image";

export default function HydrationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hydrated } = useAuthStore();

  if (!hydrated) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-y-10 bg-white z-50">
        <Image
          src="/icons/logo.png"
          alt="Logo"
          width={100}
          height={130}
          className="w-[100px] h-[130px]"
        />
        <SpinnerbLoader className="w-12 border-4 border-primary border-r-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}
