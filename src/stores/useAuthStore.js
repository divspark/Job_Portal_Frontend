import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setToken: (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    set({ token });
  },
  setUser: (user) =>
    set((state) => {
      if (JSON.stringify(state.user) === JSON.stringify(user)) return state;
      return { user };
    }),
  setIsAuthenticated: (isAuthenticated) =>
    set((state) => {
      if (state.isAuthenticated === isAuthenticated) return state;
      return { isAuthenticated };
    }),
  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
