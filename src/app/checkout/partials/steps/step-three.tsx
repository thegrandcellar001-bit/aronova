"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/stores/auth";
import { UserAddress } from "@/types/account/user";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

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

export default function StepThree({
  userAddresses,
  deliveryFormData,
  setStep,
  prevStep,
  nextStep,
}: {
  userAddresses: UserAddress[];
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
}) {
  const { user } = useAuthStore();
  const { toastSuccess, toastError } = useToast();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handlePaymentInitialization = async (order: OrderData) => {
    setSubmitLoading(true);
    try {
      const response = await api.post(`/payments/initialize`, {
        amount: order.total_amount,
        currency: "NGN",
        email: user.email,
        order_id: order.id,
      });
      const { authorization_url } = response.data;
      window.location.href = authorization_url;
    } catch (e) {
      toastError("Failed to initialize payment. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    setSubmitLoading(true);
    try {
      const res = await api.post(`/orders`);
      const order = res.data;
      toastSuccess("Redirecting to our payment gateway.");
      await handlePaymentInitialization(order);
    } catch (e) {
      toastError("Failed to place order. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <h6 className="text-xl md:text-2xl font-bold text-black">
        3. Confirm Order
      </h6>

      <div className="text-md mt-4 text-black">
        Please confirm your delivery address and payment method before placing
        your order.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-3 rounded-md border-2 border-primary p-4">
          {userAddresses.length > 0 ? (
            <div>
              <p className="text-md font-medium text-black">
                <i className="far fa-map text-md mr-1"></i> Delivery Address
              </p>
              {userAddresses
                .filter((address) => address.is_default === false)
                .map((address, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm text-black font-medium">
                      {user.name}
                    </p>
                    <p className="text-sm text-black">
                      {`${address.delivery_address}, ${address.lga}, ${address.state}`}
                    </p>
                    <p className="text-sm text-black">{address.phone_number}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <p className="text-md font-medium text-black">
                <i className="far fa-map text-md mr-1"></i> Delivery Address
              </p>
              <p className="text-sm text-black mt-2">{user.name}</p>
              <p className="text-sm text-black">
                {`${deliveryFormData.address}, ${deliveryFormData.city}, ${deliveryFormData.state}`}
              </p>
              <p className="text-sm text-black">{deliveryFormData.phone}</p>
            </div>
          )}
          <div
            className="flex items-center gap-2 text-primary font-medium cursor-pointer"
            onClick={() => setStep(1)}
          >
            <i className="far fa-edit text-md"></i>
            <span className="text-sm">Change Address</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-md border-2 border-primary p-4">
          <div>
            <p className="text-md font-medium text-black">
              <i className="far fa-credit-card text-md mr-1"></i> Payment Method
            </p>
            <div className="mt-2">
              <p className="text-sm text-black font-medium">
                Credit or debit card
              </p>
              <p className="text-sm text-black/60">
                You'll be redirected to your payment gateway to complete your
                purchase.
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 text-primary font-medium cursor-pointer"
            onClick={() => setStep(2)}
          >
            <i className="far fa-edit text-md"></i>
            <span className="text-sm">Change payment method</span>
          </div>
        </div>
      </div>

      <div className="text-md mt-4 text-black">
        By clicking confirm order you confirm that you have read, understood and
        accepted the{" "}
        <Link
          href="/terms"
          className="font-medium hover:underline hover:underline-offset-2"
        >
          Order and Delivery T&Cs
        </Link>
        ,{" "}
        <Link
          href="/privacy"
          className="font-medium hover:underline hover:underline-offset-2"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/returns"
          className="font-medium hover:underline hover:underline-offset-2"
        >
          Returns Policy
        </Link>
        .
      </div>

      <div className="mt-4 flex items-center gap-4 flex-col md:flex-row">
        <Button
          type="button"
          variant="ghost"
          className="text-sm md:text-base font-medium w-full py-4 h-[54px] md:h-[60px] cursor-pointer"
          onClick={prevStep}
        >
          <FaArrowLeft className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
          Back
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="text-sm md:text-base text-white font-medium w-full py-4 h-[54px] md:h-[60px] group cursor-pointer"
          onClick={() => handleSubmitOrder()}
        >
          {submitLoading ? (
            "Placing order..."
          ) : (
            <Fragment>
              Confirm order
              <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
            </Fragment>
          )}
        </Button>
      </div>
    </div>
  );
}
