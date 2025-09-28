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
import { useToast } from "@/hooks/useToast";
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
    name: address.name,
    phone: address.phone,
    additionalPhone: address.additionalPhone,
    address: address.address,
    state: address.state,
    lga: address.lga,
    isDefault: address.isDefault,
  });

  // Keep formData in sync with incoming address prop
  useEffect(() => {
    if (address) {
      setFormData({
        name: address.name,
        phone: address.phone,
        additionalPhone: address.additionalPhone,
        address: address.address,
        state: address.state,
        lga: address.lga,
        isDefault: address.isDefault,
      });
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (formData.name.length < 2) {
      toastError("Name must be at least 2 characters.");
      return;
    }
    if (formData.phone.length < 2) {
      toastError("Phone number must be at least 2 characters.");
      return;
    }
    if (formData.additionalPhone && formData.additionalPhone.length < 2) {
      toastError("Additional phone number must be at least 2 characters.");
      return;
    }
    if (formData.address.length < 2) {
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
      await api.put("/account/address", {
        id: address.id,
        ...formData,
      });

      toastSuccess("Address updated.");
      onSave({ id: address.id, ...formData }); // Update parent
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
        <DialogContent className="max-w-xl">
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
      <DrawerContent>
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
    name: string;
    phone: string;
    additionalPhone?: string;
    address: string;
    state: string;
    lga: string;
    isDefault: boolean;
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
      className={cn("grid items-start gap-6", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-3 mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Edit name"
          className="h-12"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor="phone">Matric number</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="Edit phone number"
            className="h-12"
            value={formData.phone}
            onChange={(e) => setFormData({ phone: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="additional-phone">Additional phone number</Label>
          <Input
            id="additional-phone"
            placeholder="Edit additional phone number"
            className="h-12"
            value={formData.additionalPhone}
            onChange={(e) => setFormData({ additionalPhone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="delivery-address">Delivery Address</Label>
        <Input
          id="delivery-address"
          placeholder="Edit delivery address"
          className="h-12"
          value={formData.address}
          onChange={(e) => setFormData({ address: e.target.value })}
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
            <SelectTrigger className="w-full h-14">
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
              <SelectTrigger className="w-full h-14">
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
          <Checkbox id="saveAsDefault" defaultChecked={formData.isDefault} />
          <Label htmlFor="saveAsDefault">Save as default address</Label>
        </div>
      </div>

      <Button
        className="cursor-pointer"
        type="submit"
        disabled={
          formData.name.length < 2 ||
          formData.phone.length < 2 ||
          (formData.additionalPhone && formData.additionalPhone.length < 2) ||
          formData.address.length < 2 ||
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
