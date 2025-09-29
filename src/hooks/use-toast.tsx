import { toast } from "sonner";

const useToast = () => {
  const toastSuccess = (message: string) =>
    toast.success(message, {
      style: {
        background: "#004B3C",
        color: "#fafafa",
        width: "100%",
        border: "none",
      },
      position: "bottom-center",
    });
  const toastError = (message: string) =>
    toast.error(message, {
      style: {
        background: "#e91e63",
        color: "#fafafa",
        width: "100%",
        border: "none",
      },
      position: "bottom-center",
    });
  const toastDefault = (message: string) => toast(message);
  const toastWarning = (message: string) => toast.warning(message);

  return { toastSuccess, toastError, toastDefault, toastWarning };
};

export { useToast };
