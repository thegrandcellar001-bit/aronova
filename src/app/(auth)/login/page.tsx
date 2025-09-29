"use client";

import { LoginForm } from "./partials/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-between mt-10 max-w-frame mx-auto">
      {/* Left side (login form) */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-center mb-10">
          <div className="mx-auto px-6 w-full md:max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right side (animated text + icons) */}
      <div className="relative hidden lg:block flex-1">
        <div className="m-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">New to Aronova?</h2>
            <p className="text-lg">
              You can always create an account. It's quick and easy, it enables
              you to access exclusive features and offers.
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
