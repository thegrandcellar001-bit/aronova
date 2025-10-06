"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { decodeJwt } from "jose";
import { useAuthStore } from "@/lib/stores/auth";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setAuth(token, decodeJwt(token));
        router.replace("/shop");
      }
    };

    fetchData();
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
