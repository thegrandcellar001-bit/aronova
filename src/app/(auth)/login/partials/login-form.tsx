"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { auth } from "@/lib/axios";

import { useToast } from "@/hooks/use-toast";
import { Field, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/stores/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { toastSuccess, toastError } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await auth.post("/customer/login", {
        email,
        password,
      });

      if (response.status !== 200) {
        console.error("Login failed:", response);
        toastError("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const { token } = response.data;

      setAuth(token, decodeJwt(token));

      toastSuccess("Login successful!");

      setTimeout(() => {
        router.push("/shop");
      }, 200);
    } catch (error) {
      console.error("Login failed:", error);
      toastError("Login failed. Please check your credentials.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/customer/auth/google`;
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/shop");
    }
  }, [isAuthenticated, router]);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Already a member?</h1>
        <p className="text-muted-foreground text-md text-balance">
          Login to your account below
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">E-mail address</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="h-[44px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/password/forgot"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="flex items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-[44px]"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <a
              className="flex items-center gap-x-2 cursor-pointer text-sm p-2.5 ml-[-41px] z-10 hover:bg-black/10 rounded-full"
              onClick={togglePasswordVisibility}
            >
              <i
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </a>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full cursor-pointer bg-secondary hover:border-2 hover:border-secondary hover:bg-transparent hover:text-secondary text-white"
          disabled={loading || !email || !password}
          onClick={handleSubmit}
        >
          {loading ? <Spinner /> : "Login"}
        </Button>

        <Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer mt-2"
            onClick={handleGoogleLogin}
          >
            <i className="fab fa-google mr-2"></i>
            Login with Google
          </Button>
        </Field>
      </div>
    </form>
  );
}
