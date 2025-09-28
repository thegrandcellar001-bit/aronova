"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    toast.success("Registration functionality to be implemented");
    setLoading(false);
  };

  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in the form below to create a new account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">E-mail address</Label>
          <Input
            id="email"
            type="email"
            className="h-[44px]"
            placeholder="m@example.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            type="text"
            className="h-[44px]"
            placeholder="John Doe"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="flex items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-[44px]"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input
            className="h-[44px]"
            id="confirm-password"
            placeholder="Re-enter your password"
            type={showPassword ? "text" : "password"}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium flex items-center gap-2">
            Select your country
          </label>
          <CountryDropdown
            value={formData.country}
            onChange={(country) => {
              if (!Array.isArray(country)) {
                setFormData({ ...formData, country: country.alpha2 });
              }
            }}
            placeholder="Select your country"
            textSize="sm"
          />
        </div>

        <Button
          className="w-full cursor-pointer bg-primary hover:border-2 hover:border-primary hover:bg-transparent hover:text-primary text-white"
          disabled={
            loading ||
            !formData.country ||
            !formData.email ||
            !formData.fullName ||
            !formData.password ||
            !formData.confirmPassword
          }
          onClick={handleSubmit}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}
