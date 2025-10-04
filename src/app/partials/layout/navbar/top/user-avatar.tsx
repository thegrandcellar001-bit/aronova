"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { logout } from "@/lib/features/auth/authSlice";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const UserAvatar = () => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const router = useRouter();
  const { toastError, toastSuccess } = useToast();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const response = await api.post("/customer/logout");

      if (response.status !== 200) {
        toastError("An error occurred during logout.");
        return;
      } else {
        await dispatch(logout());
        toastSuccess("Logged out successfully.");
        router.push("/login");
      }
    } catch (error) {
      toastError("Logout failed.");
    } finally {
      await dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarFallback className="text-md font-semibold bg-gray-200">
            {getInitials(user?.name || "Guest User")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[225px]">
        <DropdownMenuItem>
          <Link
            href="/account"
            className="flex items-center gap-x-3 h-8 w-full text-[15px]"
          >
            <i className="far fa-user"></i> My account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/account/orders"
            className="flex items-center gap-x-3 h-8 w-full text-[15px]"
          >
            <i className="far fa-box"></i> Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="flex items-center gap-x-3 h-8 w-full text-[15px]"
          >
            <i className="far fa-sign-out-alt"></i> Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
