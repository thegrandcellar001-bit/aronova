"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./partials/sidebar";
import { useAppSelector } from "@/lib/hooks/redux";
import BreadcrumbAccount from "./partials/account-breadcrumb";
import { CountryDropdown } from "@/components/common/country-dropdown";
import AuthGuard from "@/lib/auth-guard";
import api from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { UserData } from "@/types/account/user";
import { useToast } from "@/hooks/use-toast";
import HolyLoader from "holy-loader";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const { user } = useAppSelector((state) => state.auth);
  const { toastError, toastSuccess } = useToast();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const editProfileElem = useRef<HTMLDivElement>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/customer/profile");
      setUserData({
        name: data.name,
        email: data.email,
        country: data.country,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        name: `${accountFormData.firstName} ${accountFormData.lastName}`,
        email: accountFormData.email,
        country: accountFormData.country,
      };
      await api.patch("/customer/update", payload);
      fetchUserData();
      setEditProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toastError("Failed to update profile");
    }
  };

  const splitName = (name: string) => {
    if (name) {
      const names = name.split(" ");
      return {
        firstName: names[0],
        lastName: names.length > 1 ? names.slice(1).join(" ") : "",
      };
    }
    return { firstName: "", lastName: "" };
  };

  const [accountFormData, setAccountFormData] = useState({
    firstName: splitName(userData?.name || "").firstName,
    lastName: splitName(userData?.name || "").lastName,
    email: userData?.email || "",
    country: userData?.country || "",
  });

  const [passwordFormData, setPasswordFormData] = useState({});

  const address = {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    additionalPhone: "555-555-5555",
    address: "123 Main St, Springfield, IL 62701",
    state: "Lagos",
    lga: "Ikeja",
    isDefault: true,
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setAccountFormData({
        firstName: splitName(userData.name).firstName,
        lastName: splitName(userData.name).lastName,
        email: userData.email,
        country: userData.country || "NG",
      });
    }
  }, [userData]);

  return (
    <AuthGuard>
      <main>
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbAccount />
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-10">
            <Sidebar />
            {loading ? (
              <div className="flex-1 flex items-center justify-center h-[250px] w-full">
                <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
                  <Spinner className="my-2 h-10 w-10" />
                  <p>Loading your account details...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4 flex-1">
                <h3 className="font-bold text-2xl md:text-3xl">
                  Hello, {userData?.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="border rounded-md p-4">
                    <h2 className="font-medium text-md border-b pb-2">
                      <i className="far fa-user mr-1"></i> Account Details
                    </h2>
                    <div className="mt-2 space-y-1">
                      <p className="text-md">{userData?.name}</p>
                      <p className="text-gray-500">{userData?.email}</p>
                    </div>
                    <Button
                      className="mt-4 cursor-pointer"
                      variant={"default"}
                      size={"lg"}
                      onClick={() => {
                        setEditProfile(!editProfile);
                        editProfileElem.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      Change your details
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h2 className="font-medium text-md border-b pb-2">
                      <i className="far fa-address-book mr-1"></i> Address Book
                    </h2>
                    <div className="mt-2 space-y-1">
                      <p className="font-medium">
                        Your default shipping address:
                      </p>
                      <div
                        key={address.id}
                        className="border rounded p-4 mt-4 flex flex-col md:flex-row md:justify-between"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium text-lg">
                            {address.name}
                          </h4>
                          <p className="space-x-4">
                            <i className="far fa-phone text-md mr-1"></i>{" "}
                            {address.phone}
                            {address.additionalPhone && (
                              <> / {address.additionalPhone}</>
                            )}
                          </p>
                          <p>
                            <i className="far fa-address-card text-md mr-1"></i>{" "}
                            {address.address}
                          </p>
                          <p>
                            <i className="far fa-map-marker-alt text-md mr-1"></i>{" "}
                            {address.lga}, {address.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-4 md:mt-0">
                          {address.isDefault && (
                            <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded ml-auto">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 col-span-full">
                    <h2 className="font-medium text-md border-b pb-2">
                      <i className="far fa-credit-card mr-1"></i> Payment Method
                    </h2>
                    <div className="mt-2 space-y-1">
                      <p className="font-medium">
                        Your default payment method:
                      </p>
                      <div className="grid gap-1.5 font-normal border rounded-md p-4 mt-3">
                        <p className="text-sm leading-none font-medium">
                          Pay with Cards, Bank Transfer or USSD
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Prepay for your order with the above methods, you will
                          be redirected to the payment gateway to complete your
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div ref={editProfileElem}>
                  {editProfile && (
                    <Tabs defaultValue="account" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="account" className="w-full h-8">
                          Account
                        </TabsTrigger>
                        <TabsTrigger value="password" className="w-full h-8">
                          Password
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="account" className="mt-4">
                        <h3 className="font-medium text-lg">
                          Edit Your Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-x-3 mt-6">
                          <div className="space-y-3">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                              className="h-12"
                              placeholder="First name"
                              value={accountFormData.firstName}
                              onChange={(e) =>
                                setAccountFormData({
                                  ...accountFormData,
                                  firstName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                              className="h-12"
                              placeholder="Last name"
                              value={accountFormData.lastName}
                              onChange={(e) =>
                                setAccountFormData({
                                  ...accountFormData,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-3 mt-4">
                          <div className="space-y-3">
                            <Label htmlFor="email-address">
                              E-mail address
                            </Label>
                            <Input
                              className="h-12"
                              placeholder="E-mail address"
                              value={accountFormData.email}
                              onChange={(e) =>
                                setAccountFormData({
                                  ...accountFormData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="grid gap-3">
                            <label className="text-sm font-medium flex items-center gap-2">
                              Select your country
                            </label>
                            <CountryDropdown
                              value={accountFormData.country}
                              onChange={(country) => {
                                if (!Array.isArray(country)) {
                                  setAccountFormData({
                                    ...accountFormData,
                                    country: country.alpha2,
                                  });
                                }
                              }}
                              placeholder="Select your country"
                              textSize="sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4 mt-6">
                          <Button
                            className="cursor-pointer"
                            variant={"default"}
                            onClick={handleUpdateProfile}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="password" className="mt-4">
                        <h3 className="font-medium text-lg">
                          Change Your Password
                        </h3>
                        <div className="grid grid-cols-1 gap-y-3 mt-4">
                          <div className="space-y-3">
                            <Label htmlFor="currentPassword">
                              Current Password
                            </Label>
                            <Input
                              className="h-12"
                              placeholder="Current Password"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 mt-4">
                          <div className="space-y-3">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              className="h-12"
                              placeholder="New Password"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="confirmPassword">
                              Confirm Password
                            </Label>
                            <Input
                              className="h-12"
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4 mt-6">
                          <Button
                            className="cursor-pointer"
                            variant={"default"}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
