import { toast } from "sonner";

const useToast = () => {
  const toastSuccess = (message: string) =>
    toast.success(message, {
      style: {
        background: "#0f9c37",
        color: "#fafafa",
        width: "fit-content",
      },
    });
  const toastError = (message: string) =>
    toast.error(message, {
      style: {
        background: "#e91e63",
        color: "#fafafa",
        width: "fit-content",
      },
    });
  const toastDefault = (message: string) => toast(message);
  const toastWarning = (message: string) => toast.warning(message);

  return { toastSuccess, toastError, toastDefault, toastWarning };
};

export { useToast };
