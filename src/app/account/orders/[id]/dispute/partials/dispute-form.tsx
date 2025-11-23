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
    <div className="border rounded-lg shadow-sm bg-card overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 px-6 py-4 border-b">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-file-signature text-primary"></i>
          Submit a Dispute
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Let us know what went wrong with your order
        </p>
      </div>

      {/* Form */}
      <form className="px-6 py-6 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-primary text-xs"></i>
            Dispute Reason
          </label>
          <Select name="reason" required>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select a reason for your dispute" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wrong_item">
                <div className="flex items-center gap-2">
                  <i className="fas fa-exchange-alt text-xs"></i>
                  Wrong Item Received
                </div>
              </SelectItem>
              <SelectItem value="damaged_item">
                <div className="flex items-center gap-2">
                  <i className="fas fa-box-open text-xs"></i>
                  Damaged Item
                </div>
              </SelectItem>
              <SelectItem value="missing_item">
                <div className="flex items-center gap-2">
                  <i className="fas fa-box text-xs"></i>
                  Missing Item
                </div>
              </SelectItem>
              <SelectItem value="other">
                <div className="flex items-center gap-2">
                  <i className="fas fa-ellipsis-h text-xs"></i>
                  Other
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <i className="fas fa-align-left text-primary text-xs"></i>
            Description
          </label>
          <Textarea
            className="min-h-[120px] resize-none"
            placeholder="Please provide detailed information about your dispute..."
            name="description"
            required
          />
          <p className="text-xs text-muted-foreground">
            Include as much detail as possible to help us resolve your issue
            quickly.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" className="gap-2" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Dispute
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            We'll review your dispute within 24-48 hours
          </p>
        </div>
      </form>
    </div>
  );
}
