"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/redux";
import { login } from "@/lib/features/auth/authSlice";
import { Spinner } from "@/components/ui/spinner";
import { decodeJwt } from "jose";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        dispatch(login({ user: decodeJwt(token), token }));
        router.replace("/shop");
      }
    };

    fetchData();
  }, [token, dispatch, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="my-2 h-10 w-10" />
        Signing you in...
      </div>
    </div>
  );
}
