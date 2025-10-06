import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) =>
        set(() => ({
          token,
          user,
          isAuthenticated: true,
        })),
      logout: () =>
        set(() => ({
          token: null,
          user: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "authStore",
      onRehydrateStorage: () => (state) => {
        window.addEventListener("storage", (event) => {
          if (event.key === "authStore") {
            const newState = JSON.parse(event.newValue || "{}");
            if (!newState?.state?.token) {
              window.location.href = "/login";
            }
          }
        });
      },
    }
  )
);
