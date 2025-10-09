import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      hydrated: false,
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
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "authStore",
      onRehydrateStorage: () => (state) => {
        // Called after Zustand rehydrates from localStorage
        if (state) {
          state.setHydrated(true);
        }

        // Listen for cross-tab logout
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
