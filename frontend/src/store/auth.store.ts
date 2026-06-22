import { create } from "zustand";
import type { User } from "../types/user.types";
import { getCurrentUserApi } from "../api/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;

  login: (user: User, token: string) => void;
  logout: () => void;

  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setToken: (token) =>
    set({
      token,
    }),

  login: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    set({
      isLoading: true,
    });

    try {
      const response = await getCurrentUserApi();

      set({
        user: response.data.data,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.log("Dharshin-", error);
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
