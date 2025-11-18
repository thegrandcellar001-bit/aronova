"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("trxref") || searchParams.get("reference");

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!reference) return;

    const verify = async () => {
      try {
        const res = await api.get(`/payments/verify/${reference}`);

        if (res.data.status === "success") {
          setMessage("Payment successful! Redirecting...");
          window.location.href = `/account/orders/${res.data.order_id}`;
        } else {
          setMessage("Payment not successful.");
        }
      } catch (err) {
        setMessage("Error verifying your payment.");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Spinner className="w-8 h-8" />
        <h1 className="text-xl font-bold">{message}</h1>
      </div>
    </div>
  );
}
