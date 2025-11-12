"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressData } from "@/types/account/address";
import { useEffect } from "react";
import { lgaList } from "../location-selector";
import { Checkbox } from "@/components/ui/checkbox";

interface EditAddressDialogProps {
  address: AddressData;
  open: boolean;
  onClose: () => void;
  onSave: (updated: AddressData) => void;
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({
  address,
  open,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toastSuccess, toastError } = useToast();

  const [formData, setFormData] = React.useState({
    phone_number: address.phone_number,
    additional_phone_number: address.additional_phone_number,
    delivery_address: address.delivery_address,
    state: address.state,
    lga: address.lga,
    is_default: address.is_default,
  });

  // Keep formData in sync with incoming address prop
  useEffect(() => {
    if (address) {
      setFormData({
        phone_number: address.phone_number,
        additional_phone_number: address.additional_phone_number,
        delivery_address: address.delivery_address,
        state: address.state,
        lga: address.lga,
        is_default: address.is_default,
      });
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (formData.phone_number.length < 2) {
      toastError("Phone number must be at least 2 characters.");
      return;
    }
    if (
      formData.additional_phone_number &&
      formData.additional_phone_number.length < 2
    ) {
      toastError("Additional phone number must be at least 2 characters.");
      return;
    }
    if (formData.delivery_address.length < 2) {
      toastError("Address must be at least 2 characters.");
      return;
    }
    if (formData.state.length < 2) {
      toastError("State must be at least 2 characters.");
      return;
    }
    if (formData.lga.length < 2) {
      toastError("LGA must be at least 2 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.patch(
        `/customer/addresses/${address.id}`,
        formData
      );
      toastSuccess("Address updated.");
      onSave({
        id: address.id,
        ...res.data,
      });
      onClose(); // Close dialog
    } catch (error) {
      console.error("Error updating address:", error);
      toastError("Failed to update address.");
    } finally {
      setLoading(false);
    }
  };

  const FormWrapper = (
    <Form
      className="px-4"
      formData={formData}
      setFormData={(data) => setFormData((prev) => ({ ...prev, ...data }))}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Edit the address information here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {FormWrapper}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Address</DrawerTitle>
          <DrawerDescription>
            Edit the address information here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        {FormWrapper}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface FormProps {
  className?: string;
  formData: {
    phone_number: string;
    additional_phone_number: string;
    delivery_address: string;
    state: string;
    lga: string;
    is_default: boolean;
  };
  setFormData: (data: Partial<FormProps["formData"]>) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({
  className,
  formData,
  setFormData,
  loading,
  onSubmit,
}: FormProps) {
  return (
    <form
      className={cn("grid items-start gap-6 mt-4", className)}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor="phone">Matric number</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="Edit phone number"
            className="h-12 bg-white"
            value={formData.phone_number}
            onChange={(e) => setFormData({ phone_number: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="additional-phone">Additional phone number</Label>
          <Input
            id="additional-phone"
            placeholder="Edit additional phone number"
            className="h-12 bg-white"
            value={formData.additional_phone_number}
            onChange={(e) =>
              setFormData({ additional_phone_number: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="delivery-address">Delivery Address</Label>
        <Input
          id="delivery-address"
          placeholder="Edit delivery address"
          className="h-12 bg-white"
          value={formData.delivery_address}
          onChange={(e) => setFormData({ delivery_address: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <Label htmlFor="state">State</Label>
          <Select
            autoComplete="off"
            defaultValue={formData.state}
            onValueChange={(e) => setFormData({ state: e })}
          >
            <SelectTrigger className="w-full h-14 bg-white mt-3">
              <SelectValue placeholder="- Select -" />
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

        <div className="w-full">
          <div className="space-y-3">
            <Label htmlFor="lga">LGA</Label>
            <Select
              autoComplete="off"
              defaultValue={formData.lga}
              onValueChange={(e) => setFormData({ lga: e })}
              disabled={!formData.state}
            >
              <SelectTrigger className="w-full h-14 bg-white mt-3">
                <SelectValue placeholder="- Select -" />
              </SelectTrigger>
              <SelectContent id="lga">
                <SelectGroup>
                  {formData.state && lgaList[formData.state]
                    ? lgaList[formData.state].map((lga, index) => (
                        <SelectItem value={lga} key={index}>
                          {lga}
                        </SelectItem>
                      ))
                    : null}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox id="saveAsDefault" defaultChecked={formData.is_default} />
          <Label htmlFor="saveAsDefault">Save as default address</Label>
        </div>
      </div>

      <Button
        className="cursor-pointer"
        type="submit"
        disabled={
          formData.phone_number.length < 2 ||
          (formData.additional_phone_number &&
            formData.additional_phone_number.length < 2) ||
          formData.delivery_address.length < 2 ||
          formData.state.length < 2 ||
          formData.lga.length < 2 ||
          loading
        }
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export default EditAddressDialog;
