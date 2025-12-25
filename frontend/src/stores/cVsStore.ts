import { create } from "zustand";
import { persist } from "zustand/middleware";

import { cVsStorageKey } from "../constants";
import type { CV } from "../types";

interface CVsStore {
  cVs: CV[];
  activeCVId: string | null;

  createCV: (cV: CV) => void;
  updateCV: (id: string, data: Partial<CV>) => void;
  deleteCV: (id: string) => void;
  setActiveCV: (id: string) => void;
}

export const useCVsStore = create<CVsStore>()(
  persist(
    (set) => ({
      cVs: [],
      activeCVId: null,

      createCV: (cV) =>
        set((state) => ({
          cVs: [...state.cVs, cV],
          activeCVId: cV.id,
        })),

      updateCV: (id, data) =>
        set((state) => ({
          cVs: state.cVs.map((cV) => (cV.id === id ? { ...cV, ...data } : cV)),
        })),

      deleteCV: (id) =>
        set((state) => ({
          cVs: state.cVs.filter((cV) => cV.id !== id),
          activeCVId: state.activeCVId === id ? null : state.activeCVId,
        })),

      setActiveCV: (id) =>
        set(() => ({
          activeCVId: id,
        })),
    }),
    {
      name: cVsStorageKey,
    },
  ),
);
