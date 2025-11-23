"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useApi } from "@/hooks/use-api";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("trxref") || searchParams.get("reference");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  }>({ type: "success", text: "Verifying payment..." });

  const { execute: verifyPayment } = useApi(`/payments/verify/${reference}`);

  useEffect(() => {
    if (!reference) return;

    const verify = async () => {
      setLoading(true);

      try {
        const res = await verifyPayment();

        if (res.status.toLowerCase() === "completed") {
          setMessage({
            type: "success",
            text: "Payment successful! Redirecting...",
          });
          window.location.href = `/account/orders`;
        } else {
          setMessage({ type: "error", text: "Payment not successful." });
        }
      } catch (err) {
        setMessage({ type: "error", text: "Error verifying your payment." });
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        {loading ? (
          <Spinner className="w-8 h-8" />
        ) : (
          <Fragment>
            <i
              className={
                message.type === "success"
                  ? "fas fa-check-circle text-green-500 text-6xl"
                  : "far fa-ban text-red-500 text-6xl"
              }
            />
            <i
              className={
                message.type === "success" ? "text-green-500" : "text-red-500"
              }
            />
            <h1 className="text-xl font-bold">{message.text}</h1>
          </Fragment>
        )}
      </div>
    </div>
  );
}
