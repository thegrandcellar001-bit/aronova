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
import { useState } from "react";
import EditAddressDialog from "@/components/common/dialogs/edit-address";
import { AddressData } from "@/types/account/address";
import DeleteAddressDialog from "@/components/common/dialogs/delete-address";
import Sidebar from "../partials/sidebar";
import BreadcrumbAddress from "./partials/address-breadcrumb";
import AuthGuard from "@/lib/auth-guard";

export default function Page() {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string | null>("");
  const [selectedLGA, setSelectedLGA] = useState<string | null>("");
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLGA(""); // Reset LGA when state changes
  };

  const handleLGAChange = (lga: string) => {
    setSelectedLGA(lga);
  };

  const addressList = [
    {
      id: "1",
      name: "John Doe",
      phone: "123-456-7890",
      additionalPhone: "555-555-5555",
      address: "123 Main St, Springfield, IL 62701",
      state: "Lagos",
      lga: "Ikeja",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "987-654-3210",
      address: "456 Elm St, Springfield, IL 62702",
      state: "Ekiti",
      lga: "Ikere",
      isDefault: false,
    },
  ];

  return (
    <AuthGuard>
      <main>
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
                            {address.phone}
                            {address.additionalPhone && (
                              <> / {address.additionalPhone}</>
                            )}
                          </p>
                          <p>
                            <i className="far fa-address-card text-md mr-1"></i>{" "}
                            {address.address}
                          </p>
                          <p>
                            <i className="far fa-map-marker-alt text-md mr-1"></i>{" "}
                            {address.lga}, {address.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-4 md:mt-0">
                          {address.isDefault && (
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
                      <p className="mt-4 text-gray-500">No addresses found.</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <h3 className="font-semibold text-xl md:text-2xl">
                    Add new address
                  </h3>
                  <div className="grid grid-cols-2 gap-x-3 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName">First name</Label>
                      <Input className="h-12" placeholder="First name" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input className="h-12" placeholder="Last name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="phoneNumber">Phone number</Label>
                      <Input
                        className="h-12"
                        type="tel"
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="addPhoneNumber">
                        Additional Phone Number
                      </Label>
                      <Input
                        className="h-12"
                        type="tel"
                        placeholder="Additional phone number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-3 mt-4">
                    <div className="space-y-3">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input className="h-12" placeholder="Delivery Address" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email-address">
                        Additional Information
                      </Label>
                      <Input
                        className="h-12"
                        type="text"
                        placeholder="Enter additional information"
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
                        <SelectTrigger className="w-full h-12">
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
                          defaultValue={selectedLGA || ""}
                          onValueChange={(e) => handleLGAChange(e)}
                          disabled={!selectedState}
                        >
                          <SelectTrigger className="w-full h-12">
                            <SelectValue placeholder="- Select -" />
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
                    <Checkbox id="saveAsDefault" />
                    <Label htmlFor="saveAsDefault">
                      Save as default address
                    </Label>
                  </div>

                  <div className="flex items-center justify-end gap-x-4 mt-6">
                    <Button className="cursor-pointer" variant={"default"}>
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
