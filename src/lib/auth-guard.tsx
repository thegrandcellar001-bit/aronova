"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";
import { useAuthStore } from "@/lib/stores/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  // Wait until Zustand finishes hydration before making a decision
  if (!hydrated)
    return (
      <div className="flex items-center justify-center h-96">
        <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
      </div>
    );

  // If user is not authenticated after hydration
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
