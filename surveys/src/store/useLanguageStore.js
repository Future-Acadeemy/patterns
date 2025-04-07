import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: "en", // default language is English
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-store", // The name used for the storage
      getStorage: () => localStorage, // By default, it uses localStorage
    }
  )
);
