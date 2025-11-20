"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/axios";
import { useAuthStore } from "@/lib/stores/auth";

export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const { toastSuccess, toastError } = useToast();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRequestReset = async () => {
    setLoading(true);
    try {
      await auth.post("/customer/request-password-reset", {
        email: formData.email,
      });
      toastSuccess("Reset link sent! Please check your email.");
      setStep(2);
    } catch (error) {
      console.error("Request reset failed:", error);
      toastError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (formData.password !== formData.confirmPassword) {
      toastError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await auth.post("/customer/reset-password", {
        email: formData.email,
        token: formData.token,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      toastSuccess("Password reset successful! Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Reset password failed:", error);
      toastError(
        "Failed to reset password. Please check your token and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleRequestReset();
    } else {
      handleResetPassword();
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
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="grid gap-6">
        {step === 1 && (
          <div className="grid gap-3">
            <Label htmlFor="email">E-mail address</Label>
            <Input
              id="email"
              type="email"
              className="h-11 bg-white"
              placeholder="example@aronova.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-3">
              <Label htmlFor="token">Reset Token</Label>
              <Input
                id="token"
                type="text"
                className="h-11 bg-white"
                placeholder="Enter the token from your email"
                value={formData.token}
                onChange={(e) =>
                  setFormData({ ...formData, token: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">New Password</Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-11 bg-white"
                  placeholder="Your new password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  autoComplete="new-password"
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

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Confirm Password</Label>
              </div>
              <Input
                className="h-11 bg-white"
                id="confirm-password"
                placeholder="Re-enter your new password"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full cursor-pointer bg-primary hover:border-2 hover:border-primary hover:bg-transparent hover:text-primary text-white"
          disabled={
            loading ||
            (step === 1 && !formData.email) ||
            (step === 2 &&
              (!formData.token ||
                !formData.password ||
                !formData.confirmPassword))
          }
        >
          {loading
            ? "Submitting..."
            : step === 1
            ? "Send Reset Link"
            : "Reset Password"}
        </Button>
      </div>
    </form>
  );
}
