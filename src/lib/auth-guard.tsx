"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";
import { useAuthStore } from "./stores/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated)
    return (
      <div className="flex items-center justify-center h-96">
        <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
      </div>
    );

  return <>{children}</>;
}
