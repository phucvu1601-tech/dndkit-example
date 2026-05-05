import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

export const LOCALES_AVAILABLE = ["en", "vi"]

i18n
  .use(Backend) // Load translation JSON files from the public/locales directory
  .use(LanguageDetector) // Automatically detect the user's browser language
  .use(initReactI18next) // Connect i18next with react-i18next
  .init({
    load: "languageOnly", // 1. Force i18next to use only 'en' or 'vi', ignoring the regional part like '-US'
    fallbackLng: "en", // Fallback language if detection fails
    debug: true, // Enable console logs for debugging
    ns: ["home"], // Define the namespaces used in your project
    defaultNS: "home", // Set the default namespace to 'home' instead of 'translation'
    supportedLngs: LOCALES_AVAILABLE, // Restrict loading to supported languages only (prevents en-US/vi-VN 404s)
    nonExplicitSupportedLngs: true, // Allow language codes like 'en-US' to use 'en' translations
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    backend: {
      // Path to the translation files
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  })

export default i18n
