import en from "./en.json";
import pt from "./pt.json";

export type Locale = "en" | "pt";

export type Locales = Locale[];

export type LocaleContent = typeof en;

const translations = {
  en,
  pt,
} satisfies Record<Locale, LocaleContent>;

export function isLocale(value: string): value is Locale {
  return value in translations;
}

export default function getTranslationsByLocale(locale: Locale): LocaleContent {
  return isLocale(locale) ? translations[locale] : en;
}
