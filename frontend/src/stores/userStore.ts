import { create } from "zustand";
import { persist } from "zustand/middleware";

import { userStorageKey } from "../constants";
import type { locale } from "../types";

function safeLocale(locale: string): locale {
  return locale.split("-")[0] as locale;
}

interface UserStore {
  locale: locale;
  isLoading: boolean;

  setLocale: (locale: locale) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      locale: safeLocale(globalThis.navigator.language || "en"),
      isLoading: false,

      setLocale: (locale) =>
        set(() => ({
          locale,
        })),

      setIsLoading: (isLoading) =>
        set(() => ({
          isLoading,
        })),
    }),
    {
      name: userStorageKey,
    },
  ),
);
