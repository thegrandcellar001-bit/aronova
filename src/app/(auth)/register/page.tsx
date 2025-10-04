"use client";

import { Field, FieldSeparator } from "@/components/ui/field";
import { RegisterForm } from "./partials/register-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/customer/auth/google`;
  };

  return (
    <div className="flex items-center justify-between mt-10 mx-auto max-w-frame">
      {/* Left side */}
      <div className="relative hidden lg:block flex-1">
        <div className="m-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Already a member?</h2>
            <p className="text-lg">You can always log in to your account.</p>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="mt-2 inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition"
              >
                Log in
              </Link>
              <Field className="w-20">
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  OR
                </FieldSeparator>
              </Field>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer mt-2 rounded-full"
                onClick={handleGoogleSignUp}
              >
                <i className="fab fa-google mr-2"></i>
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side (registration form) */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-center mb-10">
          <div className="mx-auto px-6 w-full md:max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
