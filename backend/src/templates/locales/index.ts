import de from "./de.json";
import en from "./en.json";
import pt from "./pt.json";

export const locales = ["en", "pt", "de"] as const;

export type Locale = (typeof locales)[number];

export type Locales = Locale[];

export type LocaleContent = typeof en;

const translations = {
  en,
  pt,
  de,
} satisfies Record<Locale, LocaleContent>;

export function isLocale(value: string): value is Locale {
  return value in translations;
}

export default function getTranslationsByLocale(locale: Locale): LocaleContent {
  return isLocale(locale) ? translations[locale] : en;
}
