import { create } from "zustand";
import { persist } from "zustand/middleware";

import { userStorageKey } from "../constants";
import type { locale } from "../types";

interface UserStore {
  locale: locale;
  isLoading: boolean;

  setLocale: (locale: locale) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      locale: (globalThis.navigator.language as locale) || "en",
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
