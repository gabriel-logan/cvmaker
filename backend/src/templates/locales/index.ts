import en from "./en.json";
import pt from "./pt.json";

export type Locale = "en" | "pt";

export type Locales = Locale[];

export type LocaleContent = typeof en;

export default function getTranslationsByLocale(locale: Locale): LocaleContent {
  switch (locale) {
    case "pt":
      return pt;
    default:
      return en;
  }
}
