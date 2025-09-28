"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";

interface DeleteAddressDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAddressDialog: React.FC<DeleteAddressDialogProps> = ({
  open,
  onClose,
  id,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toastSuccess, toastError } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.delete("/account/address", {
        data: {
          id,
        },
      });
      toastSuccess("Address deleted.");
      onClose(); // close the dialog
      onConfirm();
    } catch (error) {
      console.error("Error deleting address:", error);
      toastError("Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete address</DialogTitle>
            <DialogDescription className="mt-2">
              Are you sure you want to delete this address? <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button
              className="cursor-pointer"
              variant={"destructive"}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete address</DrawerTitle>
          <DrawerDescription className="mt-2">
            Are you sure you want to delete this address? <br /> This action
            cannot be undone.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <Button
            className="cursor-pointer"
            variant={"destructive"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
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

export default DeleteAddressDialog;
