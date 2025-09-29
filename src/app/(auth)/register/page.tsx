"use client";

import { RegisterForm } from "./partials/register-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-between mt-10 mx-auto max-w-frame">
      {/* Left side */}
      <div className="relative hidden lg:block flex-1">
        <div className="m-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Already a member?</h2>
            <p className="text-lg">You can always log in to your account.</p>

            <Link
              href="/login"
              className="mt-2 inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition"
            >
              Log in
            </Link>
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
