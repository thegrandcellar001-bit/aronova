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
import ApiLoader from "@/components/common/api-loader";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/app/providers/user-provider";
import { useApi } from "@/hooks/use-api";

export default function Page() {
  const { loading, addresses, fetchUserAddresses, setAddressDefault } =
    useUserData();

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string | null>("");
  const [selectedLGA, setSelectedLGA] = useState<string | null>("");
  const [addressList, setAddressList] = useState<AddressData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    phone_number: "",
    additional_phone_number: "",
    delivery_address: "",
    additional_info: "",
    state: "",
    lga: "",
    is_default: false,
  });

  const { toastSuccess, toastError } = useToast();
  const { execute: addAddress } = useApi("/customer/addresses", "POST");

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

  const handleAddAddress = async () => {
    setFormLoading(true);

    try {
      const payload = {
        phone_number: formData.phone_number,
        additional_phone_number: formData.additional_phone_number,
        delivery_address: formData.delivery_address,
        additional_info: formData.additional_info,
        state: selectedState,
        lga: selectedLGA,
        is_default: formData.is_default,
      };

      await addAddress({ data: payload });
      toastSuccess("Address added successfully");
      await fetchUserAddresses();
    } catch (error) {
      console.error("Error adding new address:", error);
      toastError("An error occurred while adding the address.");
    } finally {
      // Reset form or loading state
      setFormData({
        phone_number: "",
        additional_phone_number: "",
        delivery_address: "",
        additional_info: "",
        state: "",
        lga: "",
        is_default: false,
      });
      setSelectedState(null);
      setSelectedLGA(null);
      setFormLoading(false);
    }
  };

  const handleSetDefault = async (
    id: number,
    data: { is_default: boolean }
  ) => {
    await setAddressDefault(id, data);
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
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Address Book
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your delivery addresses
                  </p>
                </div>

                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid grid-cols-2 gap-3 h-auto w-full bg-transparent p-0">
                    <TabsTrigger
                      value="account"
                      className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                    >
                      <i className="fas fa-address-book"></i>
                      <span>My Addresses</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className="flex items-center gap-2 h-11 border-2 border-gray-200 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white font-medium rounded-lg transition-all"
                    >
                      <i className="fas fa-plus-circle"></i>
                      <span>Add New Address</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    {loading.getAddress ? (
                      <ApiLoader message="Loading your address book..." />
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg text-gray-900">
                            Saved Addresses ({addresses.length})
                          </h3>
                        </div>
                        <div className="grid gap-4">
                          {addresses.map((address) => (
                            <div
                              key={address.id}
                              className="bg-white border p-5 hover:shadow-md transition-all duration-200 relative"
                            >
                              {address.is_default && (
                                <div className="absolute top-4 right-4">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                                    <i className="fas fa-star"></i>
                                    Default
                                  </span>
                                </div>
                              )}

                              <div className="space-y-3 pr-24">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <i className="fas fa-phone text-primary"></i>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-500 mb-1">
                                      Contact Numbers
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {address.phone_number}
                                      {address.additional_phone_number && (
                                        <span className="text-gray-500">
                                          {" "}
                                          • {address.additional_phone_number}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <i className="fas fa-map-marker-alt text-primary"></i>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-500 mb-1">
                                      Delivery Address
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {address.delivery_address}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {address.lga}, {address.state}
                                    </p>
                                  </div>
                                </div>

                                {address.additional_info && (
                                  <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                      <i className="fas fa-info-circle text-primary"></i>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-500 mb-1">
                                        Additional Info
                                      </p>
                                      <p className="text-gray-700">
                                        {address.additional_info}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                {!address.is_default && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => {
                                      setAddressDefault(address.id, {
                                        is_default: true,
                                      });
                                    }}
                                  >
                                    <i className="far fa-star mr-2"></i>
                                    Set as Default
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setEditOpen(true);
                                    setSelectedAddress(address as AddressData);
                                  }}
                                >
                                  <i className="far fa-edit mr-2"></i>
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer ml-auto"
                                  onClick={() => {
                                    setDeleteOpen(true);
                                    setSelectedAddressId(address.id);
                                  }}
                                >
                                  <i className="far fa-trash-alt mr-2"></i>
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}

                          {addresses.length === 0 && (
                            <div className="text-center mt-16 mb-8">
                              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                                <i className="fal fa-map-marked-alt text-5xl text-gray-400"></i>
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                No Addresses Yet
                              </h3>
                              <p className="text-gray-500 max-w-md mx-auto mb-6">
                                You haven't added any delivery addresses. Add
                                your first address to get started with faster
                                checkout.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <div className="bg-white border p-6">
                      <div className="mb-6">
                        <h3 className="font-semibold text-lg text-gray-900">
                          Add New Address
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Fill in the details below to add a new delivery
                          address
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="phoneNumber"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative mt-3">
                            <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <Input
                              className="h-12 bg-white pl-10"
                              type="tel"
                              placeholder="Enter phone number"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="addPhoneNumber"
                            className="text-sm font-medium text-gray-700"
                          >
                            Additional Phone Number
                          </Label>
                          <div className="relative mt-3">
                            <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <Input
                              className="h-12 bg-white pl-10"
                              type="tel"
                              placeholder="Enter additional phone number"
                              name="additional_phone_number"
                              value={formData.additional_phone_number}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="address"
                            className="text-sm font-medium text-gray-700"
                          >
                            Delivery Address{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative mt-3">
                            <i className="fas fa-map-marker-alt absolute left-3 top-4 text-gray-400"></i>
                            <Input
                              className="h-12 bg-white pl-10"
                              placeholder="Enter your delivery address"
                              name="delivery_address"
                              value={formData.delivery_address}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email-address"
                            className="text-sm font-medium text-gray-700"
                          >
                            Additional Information
                          </Label>
                          <div className="relative mt-3">
                            <i className="fas fa-info-circle absolute left-3 top-4 text-gray-400"></i>
                            <Input
                              className="h-12 bg-white pl-10"
                              type="text"
                              placeholder="Landmark, building name, etc."
                              name="additional_info"
                              value={formData.additional_info}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="state"
                            className="text-sm font-medium text-gray-700"
                          >
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            autoComplete="off"
                            defaultValue={selectedState || ""}
                            onValueChange={(e) => handleStateChange(e)}
                            required
                          >
                            <SelectTrigger className="w-full h-12 bg-white mt-3">
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

                        <div className="space-y-2">
                          <Label
                            htmlFor="lga"
                            className="text-sm font-medium text-gray-700"
                          >
                            LGA <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            autoComplete="off"
                            defaultValue={selectedLGA || ""}
                            onValueChange={(e) => handleLGAChange(e)}
                            disabled={!selectedState}
                            required
                          >
                            <SelectTrigger className="w-full bg-white h-12 mt-3">
                              <SelectValue
                                placeholder={
                                  selectedState
                                    ? "Select your LGA"
                                    : "Select state first"
                                }
                              />
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

                      {addressList.length > 0 &&
                        addressList.some((address) => !address.is_default) && (
                          <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50  border">
                            <Checkbox
                              id="saveAsDefault"
                              checked={formData.is_default}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  is_default: !!checked,
                                }))
                              }
                            />
                            <Label
                              htmlFor="saveAsDefault"
                              className="text-sm font-medium cursor-pointer"
                            >
                              <i className="fas fa-star text-yellow-500 mr-2"></i>
                              Set as default address
                            </Label>
                          </div>
                        )}

                      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => {
                            setFormData({
                              phone_number: "",
                              additional_phone_number: "",
                              delivery_address: "",
                              additional_info: "",
                              state: "",
                              lga: "",
                              is_default: false,
                            });
                            setSelectedState(null);
                            setSelectedLGA(null);
                          }}
                        >
                          <i className="far fa-times mr-2"></i>
                          Clear Form
                        </Button>
                        <Button
                          className="cursor-pointer font-semibold"
                          onClick={handleAddAddress}
                          disabled={
                            formLoading ||
                            !formData.phone_number ||
                            !formData.delivery_address ||
                            !selectedState ||
                            !selectedLGA
                          }
                        >
                          {formLoading ? (
                            <>
                              <i className="fas fa-spinner fa-spin mr-2"></i>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="far fa-save mr-2"></i>
                              Save Address
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {selectedAddress && (
            <EditAddressDialog
              address={selectedAddress}
              open={editOpen}
              onSave={() => fetchUserAddresses()}
              onClose={() => setEditOpen(false)}
            />
          )}

          {selectedAddressId && (
            <DeleteAddressDialog
              id={selectedAddressId}
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              onConfirm={() => fetchUserAddresses()}
            />
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
