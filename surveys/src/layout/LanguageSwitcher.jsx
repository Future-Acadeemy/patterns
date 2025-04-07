import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../store/useLanguageStore"; // Import Zustand store

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore(); // Get language and setLanguage from Zustand store

  const changeLanguage = (lng) => {
    setLanguage(lng); // Update language in the Zustand store
    i18n.changeLanguage(language); // Update i18n language

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"; // Set the document direction
    console.log(`Current language: ${i18n.language}`);
  };

  useEffect(() => {
    // Ensure the page direction matches the selected language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(language); // Change i18n language on mount
  }, [language, i18n]); // When language changes, update direction and i18n

  return (
    <div className="flex gap-2 justify-end p-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            language === "en" // Use language from Zustand instead of i18n
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
          }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            language === "ar" // Use language from Zustand instead of i18n
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
          }`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
