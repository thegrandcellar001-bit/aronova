"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { decodeJwt } from "jose";
import { useAuthStore } from "@/lib/stores/auth";

function AuthSuccessInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    if (token) {
      setAuth(token, decodeJwt(token));
      router.replace("/shop");
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="my-2 h-10 w-10" />
        Signing you in...
      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner className="my-2 h-10 w-10" />
        </div>
      }
    >
      <AuthSuccessInner />
    </Suspense>
  );
}
