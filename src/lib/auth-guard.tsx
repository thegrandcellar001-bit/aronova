"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login"); // redirect to login
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  return <>{children}</>;
}
