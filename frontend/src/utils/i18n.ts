import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import en from "./locales/en.json";

export const resources = {
  en: {
    translation: en,
  },
} as const;

i18next.use(initReactI18next).init({
  resources,

  lng: "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
