import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Detects the user's language

// Import the translation JSON files directly
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// Initialize i18next
i18n
  .use(LanguageDetector) // Automatically detects language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en.translation }, // English translations
      ar: { translation: ar.translation }, // Arabic translations
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback to English if no match
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Set to false to avoid issues with SSR
    },
  });

export default i18n;
