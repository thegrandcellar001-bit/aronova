"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./partials/sidebar";
import BreadcrumbAccount from "./partials/account-breadcrumb";
import { CountryDropdown } from "@/components/common/country-dropdown";
import AuthGuard from "@/lib/auth-guard";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth";
import ApiLoader from "@/components/common/api-loader";
import { useUserData } from "../providers/user-provider";
import { AddressData } from "@/types/account/address";
import { useApi } from "@/hooks/use-api";

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
  const { execute: resetPassword } = useApi("/customer/reset-password", "POST");

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
      await resetPassword({
        data: {
          email: user.email,
          new_password: passwordFormData.newPassword,
        },
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
              <div className="flex flex-col gap-y-6 flex-1">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                  <div className="flex items-center gap-6 mb-2">
                    <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
                      <i className="fas fa-user text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Welcome back,</p>
                      <h3 className="font-bold text-2xl">{userData?.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <h2 className="font-semibold text-lg text-gray-900">
                        Account Details
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          Full Name
                        </p>
                        <p className="font-medium text-gray-900">
                          {userData?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          Email Address
                        </p>
                        <p className="text-gray-700">{userData?.email}</p>
                      </div>
                    </div>
                    <Button
                      className="mt-6 w-full font-semibold cursor-pointer"
                      variant={"default"}
                      size={"lg"}
                      onClick={() => {
                        setEditProfile(!editProfile);
                        editProfileElem.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      <i className="far fa-edit mr-2"></i>
                      Edit Profile
                    </Button>
                  </div>
                  <div className="bg-white border p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      <h2 className="font-semibold text-lg text-gray-900">
                        Default Address
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {defaultAddress ? (
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <i className="fas fa-phone text-gray-400 mt-1"></i>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Contact
                              </p>
                              <p className="font-medium text-gray-900">
                                {defaultAddress.phone_number}
                                {defaultAddress.additional_phone_number && (
                                  <span className="text-gray-500">
                                    {" "}
                                    • {defaultAddress.additional_phone_number}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <i className="fas fa-map-marker-alt text-gray-400 mt-1"></i>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Address
                              </p>
                              <p className="font-medium text-gray-900">
                                {defaultAddress.delivery_address}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {defaultAddress.lga}, {defaultAddress.state}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                            <i className="fal fa-map-marked-alt text-3xl text-gray-400"></i>
                          </div>
                          <p className="text-gray-500 text-sm">
                            No default address set yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div ref={editProfileElem} className="mt-6">
                  {editProfile && (
                    <div className="bg-white border p-6">
                      <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid grid-cols-2 gap-3 h-auto w-full bg-transparent p-0">
                          <TabsTrigger
                            value="account"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all cursor-pointer"
                          >
                            <i className="fas fa-user-edit"></i>
                            <span>Edit Profile</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="password"
                            className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all cursor-pointer"
                          >
                            <i className="fas fa-lock"></i>
                            <span>Change Password</span>
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="mt-6">
                          <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-900">
                              Edit Your Profile
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Update your personal information
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="first-name"
                                className="text-sm font-medium text-gray-700"
                              >
                                First Name{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  className="h-12 bg-white pl-10"
                                  placeholder="Enter first name"
                                  value={accountFormData.firstName}
                                  onChange={(e) =>
                                    setAccountFormData({
                                      ...accountFormData,
                                      firstName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <Label
                                htmlFor="last-name"
                                className="text-sm font-medium text-gray-700"
                              >
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  className="h-12 bg-white pl-10"
                                  placeholder="Enter last name"
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
                          </div>
                          <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                              <Label
                                htmlFor="email-address"
                                className="text-sm font-medium text-gray-700"
                              >
                                Email Address{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  className="h-12 bg-white pl-10"
                                  placeholder="Enter email address"
                                  type="email"
                                  value={accountFormData.email}
                                  onChange={(e) =>
                                    setAccountFormData({
                                      ...accountFormData,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700">
                                Country <span className="text-red-500">*</span>
                              </Label>
                              <div className="mt-3">
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
                          </div>

                          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
                            <Button
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => setEditProfile(false)}
                            >
                              <i className="far fa-times mr-2"></i>
                              Cancel
                            </Button>
                            <Button
                              className="cursor-pointer font-semibold"
                              variant={"default"}
                              onClick={handleUpdateProfile}
                              disabled={loading.updateUser}
                            >
                              {loading.updateUser ? (
                                <>
                                  <i className="fas fa-spinner fa-spin mr-2"></i>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <i className="far fa-save mr-2"></i>
                                  Save Changes
                                </>
                              )}
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="password" className="mt-6">
                          <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-900">
                              Change Your Password
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Update your account password
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label
                                htmlFor="currentPassword"
                                className="text-sm font-medium text-gray-700"
                              >
                                Current Password{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  type="password"
                                  className="h-12 bg-white pl-10"
                                  placeholder="Enter current password"
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <Label
                                htmlFor="newPassword"
                                className="text-sm font-medium text-gray-700"
                              >
                                New Password{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  type="password"
                                  className="h-12 bg-white pl-10"
                                  placeholder="Enter new password"
                                  value={passwordFormData.newPassword}
                                  onChange={(e) =>
                                    setPasswordFormData({
                                      ...passwordFormData,
                                      newPassword: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <Label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700"
                              >
                                Confirm Password{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative mt-3">
                                <i className="fas fa-check-circle absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <Input
                                  type="password"
                                  className="h-12 bg-white pl-10"
                                  placeholder="Confirm new password"
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
                          </div>

                          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
                            <Button
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => setEditProfile(false)}
                            >
                              <i className="far fa-times mr-2"></i>
                              Cancel
                            </Button>
                            <Button
                              className="cursor-pointer font-semibold"
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
                              {loading.updateUser ? (
                                <>
                                  <i className="fas fa-spinner fa-spin mr-2"></i>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <i className="far fa-save mr-2"></i>
                                  Update Password
                                </>
                              )}
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
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
