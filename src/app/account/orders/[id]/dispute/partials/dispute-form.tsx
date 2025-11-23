import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";

interface DisputeFormProps {
  orderId: string;
  onSuccess: () => void;
}

export default function DisputeForm({ orderId, onSuccess }: DisputeFormProps) {
  const { toastSuccess, toastError } = useToast();
  const { execute: submitDispute, loading } = useApi("/disputes", "POST");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const reason = formData.get("reason");
    const description = formData.get("description");

    try {
      await submitDispute({
        data: {
          order_id: orderId,
          reason,
          description,
        },
      });
      toastSuccess("Dispute submitted successfully.");
      onSuccess();
    } catch (error) {
      console.error("Error submitting dispute:", error);
      toastError("Failed to submit dispute. Please try again later.");
    }
  };

  return (
    <div className="mt-2 mb-6">
      <h3 className="text-lg font-semibold">Submit a Dispute for this Order</h3>
      <form className="flex flex-col gap-y-4 mt-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Dispute Reason</label>
          <Select name="reason" required>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wrong_item">Wrong Item Received</SelectItem>
              <SelectItem value="damaged_item">Damaged Item</SelectItem>
              <SelectItem value="missing_item">Missing Item</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block mb-1 font-medium">Dispute Description</label>
          <Textarea
            className="w-full border rounded-md p-2"
            rows={4}
            placeholder="Write your dispute description here..."
            name="description"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-fit cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
