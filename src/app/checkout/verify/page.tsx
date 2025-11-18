"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!reference) return;

    const verify = async () => {
      try {
        const res = await api.get(`/payments/verify/${reference}`);

        if (res.data.status === "success") {
          setMessage("Payment successful! Redirecting...");
          // user-friendly: redirect to order details or thank you page
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
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
}
