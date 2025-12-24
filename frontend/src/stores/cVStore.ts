import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CVStore {
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      firstName: "",
      middleName: null,
      lastName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      experiences: [],
      education: [],
      skills: [],
      languages: [],
    }),
    {
      name: "cv-storage",
    },
  ),
);
