"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import axios from "@/lib/axios";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { login, logout } from "@/lib/features/auth/authSlice";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("/customer/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        console.error("Login failed:", response);
        toast.error("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const { user, token } = response.data;

      dispatch(
        login({
          user: decodeJwt(token),
          token,
        })
      );
      router.push("/shop");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/shop");
    }
  }, [isAuthenticated, router]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
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
          className="w-full cursor-pointer bg-primary hover:border-2 hover:border-primary hover:bg-transparent hover:text-primary text-white"
          disabled={loading || !email || !password}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
