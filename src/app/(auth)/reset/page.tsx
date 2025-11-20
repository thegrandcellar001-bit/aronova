"use client";

import { Field, FieldSeparator } from "@/components/ui/field";
import { ResetForm } from "./partials/reset-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/customer/auth/google`;
  };

  return (
    <main className="bg-white pt-36 pb-10 h-screen mx-auto">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Forgot your password?</h2>
          <p className="text-lg">You can reset your password here.</p>
        </div>

        <div className="mt-10 w-full max-w-md">
          <ResetForm />
        </div>
      </section>
    </main>
  );
}
