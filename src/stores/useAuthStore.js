import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => set({ token }),
      setUser: (user) =>
        set((state) => {
          if (JSON.stringify(state.user) === JSON.stringify(user)) {
            return state;
          }
          return { user };
        }),
      setIsAuthenticated: (isAuthenticated) =>
        set((state) => {
          if (state.isAuthenticated === isAuthenticated) {
            return state; // No update if unchanged
          }
          return { isAuthenticated };
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
