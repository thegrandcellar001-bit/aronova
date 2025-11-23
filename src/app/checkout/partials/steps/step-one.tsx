"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { lgaList } from "@/components/common/location-selector";
import { useUserData } from "@/app/providers/user-provider";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { UserAddress } from "@/types/account/user";
import { AddressData } from "@/types/account/address";

export default function StepOne({
  user,
  setStep,
  userAddress,
  deliveryFormData,
  setDeliveryFormData,
}: {
  user: { name: string };
  setStep: (step: number) => void;
  userAddress: UserAddress | null;
  deliveryFormData: {
    address: string;
    city: string;
    state: string;
    phone: string;
    additionalPhone: string;
  };
  setDeliveryFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const {
    addUserAddress,
    loading: userLoading,
    fetchUserAddresses,
  } = useUserData();
  const [userAddresses, setUserAddresses] = useState<AddressData[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const handleStateChange = (e: string) => {
    const state = e;
    setDeliveryFormData((prevData: any) => ({
      ...prevData,
      state: state,
    }));
  };

  const handleLGAChange = (e: string) => {
    const lga = e;
    setDeliveryFormData((prevData: any) => ({
      ...prevData,
      city: lga,
    }));
  };

  const handleSubmitDeliveryAddress = async () => {
    setSubmitLoading(userLoading.addAddress);

    try {
      await addUserAddress({
        state: deliveryFormData.state,
        lga: deliveryFormData.city,
        delivery_address: deliveryFormData.address,
        phone_number: deliveryFormData.phone,
        additional_phone_number: deliveryFormData.additionalPhone,
        additional_info: "N/A",
        is_default: true,
      });
      setStep(2);
    } catch (e) {
      toastError("Failed to save delivery address. Please try again.");
    } finally {
      setSubmitLoading(userLoading.addAddress);
    }
  };

  return (
    <div className="bg-white border p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">1</span>
        </div>
        <h3 className="font-semibold text-xl text-gray-900">
          Delivery Details
        </h3>
      </div>

      {userAddress ? (
        <Fragment>
          <div className="bg-gray-50 border border-gray-200 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
              <i className="fas fa-map-marker-alt text-primary"></i>
              <p className="font-semibold text-gray-900">Saved Address</p>
            </div>
            <div className="space-y-3">
              {userAddress && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-user text-gray-500 text-sm"></i>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-home text-gray-500 text-sm mt-0.5"></i>
                    <p className="text-gray-700">
                      {userAddress.delivery_address}, {userAddress.lga},{" "}
                      {userAddress.state} State
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-phone text-gray-500 text-sm"></i>
                    <p className="text-gray-700">
                      {userAddress.phone_number}
                      {userAddress.additional_phone_number && (
                        <span> • {userAddress.additional_phone_number}</span>
                      )}
                    </p>
                  </div>
                  {userAddress.is_default && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white mt-2">
                      <i className="fas fa-star"></i>
                      Default Address
                    </span>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <i className="fas fa-info-circle text-primary mt-0.5"></i>
                  <p>
                    To use a different delivery address, change your default
                    address in your{" "}
                    <Link
                      href="/account/address"
                      className="text-primary font-medium hover:underline"
                    >
                      account settings
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="text-base font-medium w-full py-6 h-auto hover:bg-gray-50"
              asChild
            >
              <Link href="/cart">
                <FaArrowLeft className="text-lg mr-2" />
                Back to Cart
              </Link>
            </Button>
            <Button
              type="button"
              variant="default"
              className="text-base font-semibold w-full py-6 h-auto group cursor-pointer"
              onClick={() => setStep(2)}
            >
              Continue
              <FaArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>
        </Fragment>
      ) : (
        <div className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <Input
                type="text"
                placeholder="Enter your delivery address"
                className="h-12 bg-white pl-10"
                onChange={(e) =>
                  setDeliveryFormData({
                    ...deliveryFormData,
                    address: e.target.value,
                  })
                }
                value={deliveryFormData.address}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                State <span className="text-red-500">*</span>
              </label>
              <Select
                autoComplete="off"
                defaultValue={deliveryFormData.state}
                onValueChange={(e) => handleStateChange(e)}
              >
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent id="state">
                  <SelectGroup>
                    {Object.keys(lgaList).map((state, index) => (
                      <SelectItem value={state} key={index}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                LGA <span className="text-red-500">*</span>
              </label>
              <Select
                autoComplete="off"
                defaultValue={deliveryFormData.city}
                onValueChange={(e) => handleLGAChange(e)}
                disabled={deliveryFormData.state === ""}
              >
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue
                    placeholder={
                      deliveryFormData.state
                        ? "Select your LGA"
                        : "Select state first"
                    }
                  />
                </SelectTrigger>
                <SelectContent id="lga">
                  <SelectGroup>
                    {lgaList[deliveryFormData.state]?.map((lga, index) => (
                      <SelectItem value={lga} key={index}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <Input
                type="tel"
                placeholder="Enter phone number"
                className="h-12 bg-white pl-10"
                onChange={(e) =>
                  setDeliveryFormData({
                    ...deliveryFormData,
                    phone: e.target.value,
                  })
                }
                value={deliveryFormData.phone}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Additional Phone Number
            </label>
            <div className="relative">
              <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <Input
                type="tel"
                placeholder="Optional"
                className="h-12 bg-white pl-10"
                onChange={(e) =>
                  setDeliveryFormData({
                    ...deliveryFormData,
                    additionalPhone: e.target.value,
                  })
                }
                value={deliveryFormData.additionalPhone}
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <i className="fas fa-info-circle text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-900">
              This information will be saved for faster checkout next time.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="text-base font-medium w-full py-6 h-auto hover:bg-gray-50"
              asChild
            >
              <Link href="/cart">
                <FaArrowLeft className="text-lg mr-2" />
                Back to Cart
              </Link>
            </Button>
            <Button
              type="button"
              variant="default"
              className="text-base font-semibold w-full py-6 h-auto group cursor-pointer"
              onClick={handleSubmitDeliveryAddress}
              disabled={
                deliveryFormData.address === "" ||
                deliveryFormData.city === "" ||
                deliveryFormData.state === "" ||
                deliveryFormData.phone === "" ||
                submitLoading
              }
            >
              {submitLoading ? (
                <>
                  <Spinner className="w-5 h-5 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <FaArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
