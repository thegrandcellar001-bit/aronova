"use client";

import { LoginForm } from "./partials/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-white">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center max-w-frame mx-auto h-screen">
        {/* Left side (login form) */}
        <div className="mx-auto px-6 w-full md:max-w-sm">
          <LoginForm />
        </div>

        {/* Right side (animated text + icons) */}
        <div className="relative order-first md:order-last">
          <div className="m-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">New to Aronova?</h2>
              <p className="text-lg">
                You can always create an account. It's quick and easy, it
                enables you to access exclusive features and offers.
              </p>

              <Link
                href="/register"
                className="mt-2 inline-block bg-primary text-white px-6 py-2 hover:bg-primary/90 transition"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
