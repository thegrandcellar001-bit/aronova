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
    <main className="bg-white pt-28 pb-20 flex items-center">
      <section className="mx-auto max-w-md w-full px-4 md:px-0">
        <div className="text-left space-y-2">
          <Link href="/login" className="flex items-center gap-x-2 mb-3">
            <i className="fas fa-arrow-left"></i> Back to login
          </Link>

          <h2 className="text-2xl font-bold">Forgot your password?</h2>
          <p className="text-md">
            No problem, enter the email address associated with your account
            below, and we'll send you a password reset link.
          </p>
        </div>

        <div className="mt-10 w-full">
          <ResetForm />
        </div>
      </section>
    </main>
  );
}
