import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UserAddress, UserData } from "@/types/account/user";
import { splitName } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/auth";

interface UserDataContextType {
  userData: UserData | null;
  getUserFullName: () => string;
  loading: {
    global: boolean;
    addAddress: boolean;
    getAddress: boolean;
    deleteAddress: boolean;
    updateAddress: boolean;
  };
  status: {
    success: boolean;
    message: string | null;
  };
  userAddresses: UserAddress[];
  fetchUserAddresses: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  addUserAddress: (data: UserAddress) => Promise<void>;
  deleteUserAddress: (addressId: string) => Promise<void>;
  updateUserAddress: (params: {
    addressId: string;
    data: UserAddress;
  }) => Promise<void>;
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState({
    global: false,
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
      setUserAddresses(res.data.addresses.items);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
      toastError("Failed to fetch user addresses");
    } finally {
      setLoading((prev) => ({ ...prev, getAddress: false }));
    }
  };

  const addUserAddress = async (data: UserAddress) => {
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

  const deleteUserAddress = async (addressId: string) => {
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

  useEffect(() => {
    if (isAuthenticated) {
      if (!userData) fetchUserData();
      if (userAddresses.length === 0) fetchUserAddresses();
    }
  }, [isAuthenticated]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        userAddresses,
        loading,
        status,
        getUserFullName,
        fetchUserAddresses,
        refreshUserData: fetchUserData,
        addUserAddress,
        deleteUserAddress,
        updateUserAddress,
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
