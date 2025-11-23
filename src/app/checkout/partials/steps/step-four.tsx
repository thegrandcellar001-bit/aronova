"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/auth";
import { UserAddress } from "@/types/account/user";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useApi } from "@/hooks/use-api";

interface OrderData {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  delivery_address: string;
  order_items: {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    image_url: string;
  }[];
  created_at: string;
  updated_at: string;
}

export default function StepFour({
  userAddress,
  deliveryFormData,
  setStep,
  prevStep,
  nextStep,
  selectedDeliveryMethod,
}: {
  userAddress: UserAddress | null;
  deliveryFormData: {
    address: string;
    city: string;
    state: string;
    phone: string;
    additionalPhone?: string;
  };
  setStep: (step: number) => void;
  prevStep: () => void;
  nextStep: () => void;
  selectedDeliveryMethod: string;
}) {
  const { user } = useAuthStore();
  const { toastSuccess, toastError } = useToast();
  const [submitLoading, setSubmitLoading] = useState(false);

  const { execute: createOrder } = useApi("/orders", "POST");

  const handleSubmitOrder = async () => {
    setSubmitLoading(true);
    try {
      const data = await createOrder({
        data: {
          shipping_method: selectedDeliveryMethod,
        },
      });
      const { payment_authorization_url } = data;
      toastSuccess("Redirecting to our payment gateway.");
      window.location.href = payment_authorization_url;
    } catch (e) {
      toastError("Failed to place order. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="bg-white border p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">4</span>
        </div>
        <h3 className="font-semibold text-xl text-gray-900">Confirm Order</h3>
      </div>

      <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
        <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
        <p className="text-sm text-blue-900">
          Please review your delivery address and payment method before placing
          your order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-200 p-5 space-y-3">
          {userAddress ? (
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <p className="font-semibold text-gray-900">Delivery Address</p>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-gray-500 text-sm"></i>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fas fa-home text-gray-500 text-sm mt-0.5"></i>
                  <p className="text-gray-700 text-sm">
                    {`${userAddress.delivery_address}, ${userAddress.lga}, ${userAddress.state}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-phone text-gray-500 text-sm"></i>
                  <p className="text-gray-700 text-sm">
                    {userAddress.phone_number}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <p className="font-semibold text-gray-900">Delivery Address</p>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-gray-500 text-sm"></i>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fas fa-home text-gray-500 text-sm mt-0.5"></i>
                  <p className="text-gray-700 text-sm">
                    {`${deliveryFormData.address}, ${deliveryFormData.city}, ${deliveryFormData.state}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-phone text-gray-500 text-sm"></i>
                  <p className="text-gray-700 text-sm">
                    {deliveryFormData.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 p-5 space-y-3">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
              <i className="fas fa-credit-card text-primary"></i>
              <p className="font-semibold text-gray-900">Payment Method</p>
            </div>
            <div className="mt-3 space-y-2">
              <p className="font-medium text-gray-900">Credit or Debit Card</p>
              <p className="text-sm text-gray-600">
                You'll be redirected to our secure payment gateway to complete
                your purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-5 space-y-3 mt-4">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
            <i className="fas fa-shipping-fast text-primary"></i>
            <p className="font-semibold text-gray-900">Delivery Method</p>
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
              <i
                className={`fas ${
                  selectedDeliveryMethod === "standard"
                    ? "fa-truck"
                    : "fa-truck-fast"
                }`}
              ></i>
              {selectedDeliveryMethod === "standard"
                ? "Standard Delivery"
                : "Express Delivery"}
            </span>
            <p className="text-sm text-gray-600 mt-2">
              {selectedDeliveryMethod === "standard"
                ? "3-5 business days"
                : "1-2 business days"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg mt-6">
        <i className="fas fa-file-contract text-gray-500 mt-0.5"></i>
        <p className="text-sm text-gray-700">
          By clicking confirm order you confirm that you have read, understood
          and accepted the{" "}
          <Link
            href="/terms"
            className="text-primary font-medium hover:underline"
          >
            Order and Delivery T&Cs
          </Link>
          ,{" "}
          <Link
            href="/privacy"
            className="text-primary font-medium hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/returns"
            className="text-primary font-medium hover:underline"
          >
            Returns Policy
          </Link>
          .
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="text-base font-medium w-full py-6 h-auto hover:bg-gray-50"
          onClick={prevStep}
        >
          <FaArrowLeft className="text-lg mr-2" />
          Back
        </Button>
        <Button
          type="button"
          variant="default"
          className="text-base font-semibold w-full py-6 h-auto group cursor-pointer"
          onClick={() => handleSubmitOrder()}
        >
          {submitLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Placing order...
            </>
          ) : (
            <>
              Confirm Order
              <FaArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
