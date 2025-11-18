import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UserData } from "@/types/account/user";
import { useAuthStore } from "@/lib/stores/auth";
import { AddressData, AddressPayload } from "@/types/account/address";

interface UserDataContextType {
  userData: UserData | null;
  addresses: AddressData[];
  getUserFullName: () => string;
  loading: {
    global: boolean;
    addAddress: boolean;
    getAddress: boolean;
    deleteAddress: boolean;
    updateAddress: boolean;
    updateUser: boolean;
  };
  status: {
    success: boolean;
    message: string | null;
  };
  fetchUserData: () => Promise<void>;
  fetchUserAddresses: () => Promise<AddressData[] | undefined>;
  fetchDefaultAddress: () => Promise<AddressData | null>;
  refreshUserData: () => Promise<void>;
  addUserAddress: (data: AddressPayload) => Promise<void>;
  deleteUserAddress: (addressId: number) => Promise<void>;
  updateUserAddress: (params: {
    addressId: string;
    data: AddressPayload;
  }) => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  setAddressDefault: (id: number, data: any) => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState({
    global: false,
    updateUser: false,
    getAddress: false,
    addAddress: false,
    deleteAddress: false,
    updateAddress: false,
  });
  const [status, setStatus] = useState({
    success: false,
    message: null as string | null,
  });
  const { toastSuccess, toastError } = useToast();

  const fetchUserData = async () => {
    setLoading((prev) => ({ ...prev, global: true }));
    try {
      const res = await api.get("/customer/profile");
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toastError("Failed to fetch user data");
    } finally {
      setLoading((prev) => ({ ...prev, global: false }));
    }
  };

  const getUserFullName = () => {
    if (!userData) return "";
    return userData.name;
  };

  const fetchUserAddresses = async () => {
    setLoading((prev) => ({ ...prev, getAddress: true }));
    try {
      const res = await api.get("/customer/addresses");
      const items = res.data.addresses.items as AddressData[];
      setAddresses(items);
      return items;
    } catch (error) {
      console.error("Error fetching user addresses:", error);
      toastError("Failed to fetch user addresses");
    } finally {
      setLoading((prev) => ({ ...prev, getAddress: false }));
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    setLoading((prev) => ({ ...prev, updateUser: true }));
    try {
      const res = await api.patch("/customer/update", data);
      setUserData(res.data);
      toastSuccess("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      toastError("Failed to update user data");
    } finally {
      setLoading((prev) => ({ ...prev, updateUser: false }));
    }
  };

  const fetchDefaultAddress = async () => {
    setLoading((prev) => ({ ...prev, getAddress: true }));
    try {
      const res = await api.get("/customer/addresses");
      return res.data.addresses.items.filter(
        (address: AddressData) => address.is_default
      )[0] as AddressData;
    } catch (error) {
      console.error("Error fetching default address:", error);
      toastError("Failed to fetch default address");
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, getAddress: false }));
    }
  };

  const addUserAddress = async (data: AddressPayload) => {
    setLoading((prev) => ({ ...prev, addAddress: true }));
    try {
      await api.post("/customer/addresses", data);
      await fetchUserAddresses();
      setStatus({ success: true, message: "Address added successfully" });
      toastSuccess("Address added successfully");
    } catch (error) {
      console.error("Error adding address:", error);
      setStatus({ success: false, message: "Failed to add address" });
      toastError("Failed to add address");
    } finally {
      setLoading((prev) => ({ ...prev, addAddress: false }));
    }
  };

  const deleteUserAddress = async (addressId: number) => {
    setLoading((prev) => ({ ...prev, deleteAddress: true }));

    try {
      await api.delete(`/customer/addresses/${addressId}`);
      await fetchUserAddresses();
      setStatus({ success: true, message: "Address removed successfully" });
      toastSuccess("Address removed successfully");
    } catch (error) {
      console.error("Error removing address:", error);
      setStatus({ success: false, message: "Failed to remove address" });
      toastError("Failed to remove address");
    } finally {
      setLoading((prev) => ({ ...prev, deleteAddress: false }));
    }
  };

  const updateUserAddress = async ({
    addressId,
    data,
  }: {
    addressId: string;
    data: any;
  }) => {
    setLoading((prev) => ({ ...prev, updateAddress: true }));
    try {
      await api.patch(`/customer/addresses/${addressId}`, data);
      await fetchUserAddresses();
      setStatus({ success: true, message: "Address updated successfully" });
      toastSuccess("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
      setStatus({ success: false, message: "Failed to update address" });
      toastError("Failed to update address");
    } finally {
      setLoading((prev) => ({ ...prev, updateAddress: false }));
    }
  };

  const setAddressDefault = async (
    id: number,
    data: { is_default: boolean }
  ) => {
    setLoading((prev) => ({ ...prev, updateAddress: true }));
    try {
      await api.patch(`/customer/addresses/${id}`, data);
      setStatus({ success: true, message: "Default address updated." });
      toastSuccess("Default address updated.");
      await fetchUserAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
      toastError("Failed to set default address. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, updateAddress: false }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (!userData) fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        addresses,
        loading,
        status,
        getUserFullName,
        fetchUserData,
        updateUserData,
        fetchUserAddresses,
        fetchDefaultAddress,
        refreshUserData: fetchUserData,
        addUserAddress,
        deleteUserAddress,
        updateUserAddress,
        setAddressDefault,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error("useUserData must be used within a UserDataProvider");
  return context;
};
