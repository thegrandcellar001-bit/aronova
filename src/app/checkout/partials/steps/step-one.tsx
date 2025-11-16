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
    <div>
      <h6 className="text-xl md:text-2xl font-bold text-black">
        1. Delivery Details
      </h6>

      {userAddress ? (
        <Fragment>
          <div className="mt-4 mb-6 p-4 border border-black/10">
            <p className="font-medium text-md mb-2 text-black">
              Saved Address:
            </p>
            <hr className="border-t border-black/10 mb-4" />
            <div className="flex flex-col gap-3">
              {userAddress && (
                <div className="flex flex-col space-y-1">
                  <p className="text-black font-medium">{user.name}</p>
                  <p className="text-black">
                    {userAddress.delivery_address}, {userAddress.lga},{" "}
                    {userAddress.state} State
                  </p>
                  <p className="text-black">
                    Phone: {userAddress.phone_number} /{" "}
                    {userAddress.additional_phone_number}
                  </p>
                  <Badge
                    className="w-max px-2 py-1 text-xs rounded-none my-1"
                    variant={userAddress.is_default ? "default" : "outline"}
                  >
                    {userAddress.is_default
                      ? "Default Address"
                      : "Alternate Address"}
                  </Badge>
                </div>
              )}

              <div className="mt-2 text-sm text-black/60">
                <i className="far fa-info-circle mr-1"></i> If you want to use a
                different delivery address, change your default address in your
                account{" "}
                <Link
                  href="/account/address"
                  className="underline underline-offset-4"
                >
                  settings
                </Link>
                .
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
            <Button
              type="button"
              variant="ghost"
              className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
              asChild
            >
              <Link href="/cart">
                <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                Back to cart
              </Link>
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
              onClick={() => setStep(2)}
            >
              Next{" "}
              <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>
        </Fragment>
      ) : (
        <div className="flex flex-col space-y-4 mt-6">
          <Input
            type="text"
            placeholder="Delivery Address"
            className="h-12 bg-white"
            onChange={(e) =>
              setDeliveryFormData({
                ...deliveryFormData,
                address: e.target.value,
              })
            }
            value={deliveryFormData.address}
            required
          />
          <div className="flex items-center gap-x-4">
            <Select
              autoComplete="off"
              defaultValue={deliveryFormData.state}
              onValueChange={(e) => handleStateChange(e)}
            >
              <SelectTrigger className="w-full h-12 bg-white">
                <SelectValue placeholder="- Select state -" />
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

            <Select
              autoComplete="off"
              defaultValue={deliveryFormData.city}
              onValueChange={(e) => handleLGAChange(e)}
              disabled={deliveryFormData.state === ""}
            >
              <SelectTrigger className="w-full h-12 bg-white">
                <SelectValue placeholder="- Select city -" />
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
          <Input
            type="tel"
            placeholder="Phone"
            className="h-12 bg-white"
            onChange={(e) =>
              setDeliveryFormData({
                ...deliveryFormData,
                phone: e.target.value,
              })
            }
            value={deliveryFormData.phone}
            required
          />

          <Input
            type="tel"
            placeholder="Additional phone number"
            className="h-12 bg-white"
            onChange={(e) =>
              setDeliveryFormData({
                ...deliveryFormData,
                additionalPhone: e.target.value,
              })
            }
            value={deliveryFormData.additionalPhone}
            required
          />

          <p className="text-sm">
            <i className="far fa-info-circle mr-1" /> This information will be
            saved for faster check-out next time.
          </p>

          <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
            <Button
              type="button"
              variant="ghost"
              className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
              asChild
            >
              <Link href="/cart">
                <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                Back to cart
              </Link>
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
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
                <Spinner className="w-8 h-8 mx-auto" />
              ) : (
                <Fragment>
                  Next{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Fragment>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
