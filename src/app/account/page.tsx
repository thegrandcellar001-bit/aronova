"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./partials/sidebar";
import BreadcrumbAccount from "./partials/account-breadcrumb";
import { CountryDropdown } from "@/components/common/country-dropdown";
import AuthGuard from "@/lib/auth-guard";
import api from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { UserData } from "@/types/account/user";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth";
import ApiLoader from "@/components/common/api-loader";
import { useUserData } from "../providers/user-provider";
import { AddressData } from "@/types/account/address";

export default function Page() {
  const { user, token, setAuth } = useAuthStore();
  const {
    userData,
    fetchUserData,
    updateUserData,
    fetchDefaultAddress,
    loading,
  } = useUserData();
  const { toastError, toastSuccess } = useToast();

  const [editProfile, setEditProfile] = useState(false);
  const editProfileElem = useRef<HTMLDivElement>(null);

  const [defaultAddress, setDefaultAddress] = useState<AddressData>();

  const handleUpdateProfile = async () => {
    const payload = {
      name: `${accountFormData.firstName} ${accountFormData.lastName}`,
      email: accountFormData.email,
      country: accountFormData.country,
    };
    await updateUserData(payload);
    await fetchUserData();
    setEditProfile(false);
    setAuth(token || "", {
      ...user,
      name: payload.name,
      email: payload.email,
    });
    toastSuccess("Profile updated successfully");
  };

  const handleResetPassword = async () => {
    try {
      const res = await api.post("/customer/reset-password", {
        email: user.email,
        new_password: passwordFormData.newPassword,
      });
      toastSuccess("Password updated successfully");
    } catch (err) {
      console.error("Error updating password:", err);
      toastError("Failed to update password");
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

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loadAddress = async () => {
    const address = await fetchDefaultAddress();
    setDefaultAddress(address as AddressData);
  };

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

  useEffect(() => {
    loadAddress();
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10 bg-white">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbAccount />
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-10">
            <Sidebar />
            {loading.global && loading.getAddress ? (
              <ApiLoader message="Loading your account details..." />
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
                      {defaultAddress ? (
                        <div
                          key={defaultAddress.id}
                          className="border rounded p-4 mt-4 flex flex-col md:flex-row md:justify-between"
                        >
                          <div className="space-y-1">
                            <p className="space-x-4">
                              <i className="far fa-phone text-md mr-1"></i>{" "}
                              {defaultAddress.phone_number}
                              {defaultAddress.additional_phone_number && (
                                <> / {defaultAddress.additional_phone_number}</>
                              )}
                            </p>
                            <p>
                              <i className="far fa-address-card text-md mr-1"></i>{" "}
                              {defaultAddress.delivery_address}
                            </p>
                            <p>
                              <i className="far fa-map-marker-alt text-md mr-1"></i>{" "}
                              {defaultAddress.lga}, {defaultAddress.state}
                            </p>
                          </div>
                          <div className="flex items-center gap-x-2 mt-4 md:mt-0">
                            {defaultAddress.is_default && (
                              <span className="text-xs bg-primary text-white px-2 py-1 rounded ml-auto">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-2">
                          You have not set a default shipping address yet.
                        </p>
                      )}
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
                          <div>
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                              className="h-12 bg-white mt-3"
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
                          <div>
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                              className="h-12 bg-white mt-3"
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
                              className="h-12 bg-white mt-3"
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
                            disabled={loading.updateUser}
                          >
                            {loading.updateUser ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </TabsContent>

                      {/* Password Tab Content */}
                      <TabsContent value="password" className="mt-4">
                        <h3 className="font-medium text-lg">
                          Change Your Password
                        </h3>
                        <div className="grid grid-cols-1 gap-y-3 mt-4">
                          <div>
                            <Label htmlFor="currentPassword">
                              Current Password
                            </Label>
                            <Input
                              className="h-12 bg-white mt-3"
                              placeholder="Current Password"
                              value={passwordFormData.currentPassword}
                              onChange={(e) =>
                                setPasswordFormData({
                                  ...passwordFormData,
                                  currentPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 mt-4">
                          <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              className="h-12 bg-white mt-3"
                              placeholder="New Password"
                              value={passwordFormData.newPassword}
                              onChange={(e) =>
                                setPasswordFormData({
                                  ...passwordFormData,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">
                              Confirm Password
                            </Label>
                            <Input
                              className="h-12 bg-white mt-3"
                              placeholder="Confirm Password"
                              value={passwordFormData.confirmPassword}
                              onChange={(e) =>
                                setPasswordFormData({
                                  ...passwordFormData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4 mt-6">
                          <Button
                            className="cursor-pointer"
                            variant={"default"}
                            onClick={handleResetPassword}
                            disabled={
                              loading.updateUser ||
                              !passwordFormData.currentPassword ||
                              !passwordFormData.newPassword ||
                              passwordFormData.newPassword !==
                                passwordFormData.confirmPassword
                            }
                          >
                            {loading.updateUser ? "Saving..." : "Save Changes"}
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
