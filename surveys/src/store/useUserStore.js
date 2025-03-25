import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store for user info
export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {
        name: "",
        phone: "",
        age: "",
        gender: "",
        job: "",
      },
      setUserInfo: (data) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...data } })), // Merges new data
      setToken: (token) =>
        set((state) => ({ userInfo: { ...state.userInfo, token } })),
    }),
    {
      name: "user-info-storage",
    }
  )
);
