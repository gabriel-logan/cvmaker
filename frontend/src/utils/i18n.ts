import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import { useUserStore } from "../stores/userStore";
import de from "./locales/de.json";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  de: {
    translation: de,
  },
} as const;

const language = useUserStore.getState().locale;

const normalizedLanguage = language.split("-")[0];

if (!Object.keys(resources).includes(normalizedLanguage)) {
  console.warn(`Unsupported language "${language}", falling back to "en".`);
}

console.log("i18n language:", language);
console.log("i18n normalized language:", normalizedLanguage);

i18next.use(initReactI18next).init({
  resources,

  lng: normalizedLanguage,

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
