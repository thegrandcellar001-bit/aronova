"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lgaList } from "@/components/common/location-selector";
import { useEffect, useState } from "react";
import EditAddressDialog from "@/components/common/dialogs/edit-address";
import { AddressData } from "@/types/account/address";
import DeleteAddressDialog from "@/components/common/dialogs/delete-address";
import Sidebar from "../partials/sidebar";
import BreadcrumbAddress from "./partials/address-breadcrumb";
import AuthGuard from "@/lib/auth-guard";
import api from "@/lib/axios";
import ApiLoader from "@/components/common/api-loader";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string | null>("");
  const [selectedLGA, setSelectedLGA] = useState<string | null>("");
  const [addressList, setAddressList] = useState<AddressData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setRefresh] = useState<number>(0);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    deliveryAddress: "",
    additionalInfo: "",
    state: "",
    lga: "",
    isDefault: false,
  });

  const { toastSuccess, toastError } = useToast();

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLGA(""); // Reset LGA when state changes
  };

  const handleLGAChange = (lga: string) => {
    setSelectedLGA(lga);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserAddresses = async () => {
    setLoading(true);

    try {
      const res = await api.get("/customer/addresses");
      setAddressList(res.data.addresses.items as AddressData[]);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    setFormLoading(true);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phoneNumber,
        additional_phone_number: formData.additionalPhoneNumber,
        delivery_address: formData.deliveryAddress,
        additional_info: formData.additionalInfo,
        state: selectedState,
        lga: selectedLGA,
        is_default: formData.isDefault,
      };

      const res = await api.post("/customer/addresses", payload);
      toastSuccess("Address added successfully");
      setRefresh((prev) => prev + 1); // Trigger re-fetching addresses
    } catch (error) {
      console.error("Error adding new address:", error);
      toastError("An error occurred while adding the address.");
    } finally {
      // Reset form or loading state
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
        deliveryAddress: "",
        additionalInfo: "",
        state: "",
        lga: "",
        isDefault: false,
      });
      setSelectedState(null);
      setSelectedLGA(null);
      setFormLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <AuthGuard>
      <main className="pt-26 pb-10 bg-white">
        <section className="px-6 max-w-7xl mx-auto">
          <BreadcrumbAddress />
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
            <Sidebar />
            <div className="flex flex-col gap-y-4 flex-1">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="account" className="w-full">
                    Address
                  </TabsTrigger>
                  <TabsTrigger value="password" className="w-full">
                    Add new address
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  {loading ? (
                    <ApiLoader message="Loading your address book" />
                  ) : (
                    <div>
                      <h3 className="font-semibold text-xl md:text-2xl">
                        Address Book ({addressList.length})
                      </h3>
                      <div className="w-full">
                        {addressList.map((address) => (
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
                                {address.phone_number}
                                {address.additional_phone_number && (
                                  <> / {address.additional_phone_number}</>
                                )}
                              </p>
                              <p>
                                <i className="far fa-address-card text-md mr-1"></i>{" "}
                                {address.delivery_address}
                              </p>
                              <p>
                                <i className="far fa-map-marker-alt text-md mr-1"></i>{" "}
                                {address.lga}, {address.state}
                              </p>
                            </div>
                            <div className="flex items-center gap-x-2 mt-4 md:mt-0">
                              {address.is_default && (
                                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded ml-auto">
                                  Default
                                </span>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditOpen(true);
                                  setSelectedAddress(address as AddressData);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setDeleteOpen(true);
                                  setSelectedAddressId(address.id);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                        {addressList.length === 0 && (
                          <div className="text-center mt-20">
                            <h2 className="text-2xl font-semibold mb-4">
                              You have no addresses saved.
                            </h2>
                            <p className="mb-6">
                              Once you have added addresses, you can manage them
                              here.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <h3 className="font-semibold text-xl md:text-2xl">
                    Add new address
                  </h3>
                  <div className="grid grid-cols-2 gap-x-3 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        className="h-12 bg-white"
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        className="h-12 bg-white"
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="phoneNumber">Phone number</Label>
                      <Input
                        className="h-12 bg-white"
                        type="tel"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="addPhoneNumber">
                        Additional Phone Number
                      </Label>
                      <Input
                        className="h-12 bg-white"
                        type="tel"
                        placeholder="Additional phone number"
                        name="additionalPhoneNumber"
                        value={formData.additionalPhoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-3 mt-4">
                    <div className="space-y-3">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        className="h-12 bg-white"
                        placeholder="Delivery Address"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email-address">
                        Additional Information
                      </Label>
                      <Input
                        className="h-12 bg-white"
                        type="text"
                        placeholder="Enter additional information"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="state">State</Label>
                      <Select
                        autoComplete="off"
                        defaultValue={selectedState || ""}
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
                    </div>

                    <div className="w-full">
                      <div className="space-y-3">
                        <Label htmlFor="lga">LGA</Label>
                        <Select
                          autoComplete="off"
                          defaultValue={selectedLGA || ""}
                          onValueChange={(e) => handleLGAChange(e)}
                          disabled={!selectedState}
                        >
                          <SelectTrigger className="w-full h-12">
                            <SelectValue placeholder="- Select LGA -" />
                          </SelectTrigger>
                          <SelectContent id="lga">
                            <SelectGroup>
                              {selectedState && lgaList[selectedState]
                                ? lgaList[selectedState].map((lga, index) => (
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
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Checkbox
                      id="saveAsDefault"
                      checked={formData.isDefault}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          isDefault: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="saveAsDefault">
                      Save as default address
                    </Label>
                  </div>

                  <div className="flex items-center justify-end gap-x-4 mt-6">
                    <Button
                      className="cursor-pointer"
                      onClick={handleAddAddress}
                      disabled={
                        formLoading ||
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.phoneNumber ||
                        !formData.deliveryAddress ||
                        !selectedState ||
                        !selectedLGA
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {selectedAddress && (
            <EditAddressDialog
              address={selectedAddress}
              open={editOpen}
              onSave={() => console.log("Saved")}
              onClose={() => setEditOpen(false)}
            />
          )}

          {selectedAddressId && (
            <DeleteAddressDialog
              id={selectedAddressId}
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              onConfirm={() => console.log("Confirmed")}
            />
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
